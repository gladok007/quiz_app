"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ControllingQuiz() {
  const [topics, setTopics] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]); // Для multiple_response и sequencing

  useEffect(() => {
    const loadTopics = async () => {
      if (typeof window !== "undefined") {
        const context = require.context("@/data/topics", false, /\.json$/);
        const loadedTopics = {};

        for (const key of context.keys()) {
          const topicName = key.replace("./", "").replace(".json", "");
          const data = await context(key);
          loadedTopics[topicName] = data;
        }

        setTopics(loadedTopics);
      }
    };

    loadTopics();
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleAnswer = (selectedIndex = null) => {
    const questions = topics[selectedTopic];
    const question = questions[currentQuestion];
    let correct = false;

    switch (question.type) {
      case "true_false":
      case "multiple_choice":
        correct = selectedIndex === question.correct;
        break;

      case "multiple_response":
        correct =
          JSON.stringify(selectedOptions.sort()) ===
          JSON.stringify(question.correct.sort());
        break;

      case "sequencing":
        correct = JSON.stringify(selectedOptions) === JSON.stringify(question.correct);
        break;

      default:
        break;
    }

    setIsCorrect(correct);
    setCorrectAnswer(correct ? null : question.correct);

    const newAnswers = {
      ...answers,
      [currentQuestion]:
        question.type === "multiple_response" || question.type === "sequencing"
          ? selectedOptions
          : selectedIndex,
    };
    setAnswers(newAnswers);

    if (correct) {
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => nextQuestion(), 1500); // Автоматический переход при правильном ответе
    }
  };

  const nextQuestion = () => {
    const questions = topics[selectedTopic];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsCorrect(null);
      setCorrectAnswer(null);
      setSelectedOptions([]); // Сброс для multiple_response и sequencing
    } else {
      setShowResults(true);
    }
  };

  const toggleOption = (index) => {
    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const restartQuiz = () => {
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setShowResults(false);
    setSelectedOptions([]);
  };

  const goBackToMenu = () => {
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setShowResults(false);
    setSelectedOptions([]);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "true_false":
      case "multiple_choice":
        return question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full text-left justify-start p-4 ${
              isCorrect !== null && question.correct === index
                ? "bg-green-500"
                : answers[currentQuestion] === index && !isCorrect
                ? "bg-red-500"
                : ""
            }`}
          >
            {`${String.fromCharCode(65 + index)}. ${option}`}
          </Button>
        ));

      case "multiple_response":
        return (
          <>
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => toggleOption(index)}
                className={`w-full text-left justify-start p-4 ${
                  selectedOptions.includes(index) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {`${String.fromCharCode(65 + index)}. ${option}`}
              </Button>
            ))}
            <Button
              onClick={() => handleAnswer()}
              className="mt-4 bg-green-500 hover:bg-green-600"
            >
              Antwort bestätigen
            </Button>
          </>
        );

      case "sequencing":
        return (
          <>
            <p className="mb-4">Wählen Sie die richtige Reihenfolge:</p>
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => toggleOption(index)}
                className={`w-full text-left justify-start p-4 ${
                  selectedOptions.includes(index) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {`${String.fromCharCode(65 + index)}. ${option}`}
              </Button>
            ))}
            {selectedOptions.length > 0 && (
              <div className="mt-4 p-4 border rounded bg-gray-100">
                <p>Ihre Auswahl:</p>
                <ol className="list-decimal list-inside">
                  {selectedOptions.map((orderIndex) => (
                    <li key={orderIndex}>
                      {`${String.fromCharCode(65 + orderIndex)}. ${question.options[orderIndex]}`}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <Button
              onClick={() => handleAnswer()}
              className="mt-4 bg-green-500 hover:bg-green-600"
            >
              Antwort bestätigen
            </Button>
          </>
        );

      default:
        return <p>Unbekannter Fragentyp</p>;
    }
  };

  if (!selectedTopic) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Thema wählen</h2>
          <div className="space-y-4">
            {Object.keys(topics).map((topic) => (
              <Button
                key={topic}
                onClick={() => handleTopicSelect(topic)}
                className="w-full text-left justify-start p-4"
              >
                {topic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const questions = topics[selectedTopic];
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Testergebnisse</h2>
          <p className="text-xl mb-4 text-center">
            Richtige Antworten: {score} von {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>
          <Button onClick={restartQuiz} className="mt-6 bg-blue-500 hover:bg-blue-600 w-full">
            Zurück zur Themenauswahl
          </Button>
        </CardContent>
      </Card>
    );
  }

  const questions = topics[selectedTopic];
  const question = questions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <CardContent>
        <Button onClick={goBackToMenu} className="mb-4 bg-gray-500 hover:bg-gray-600 w-full">
          Zurück
        </Button>
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 text-center">
              Frage {currentQuestion + 1} von {questions.length}
            </p>
          </div>

          <h2 className="text-xl font-bold mb-6 text-center">{question.question}</h2>

          <div className="space-y-4">{renderQuestion(question)}</div>

          {isCorrect !== null && (
            <div className="mt-4">
              <p className={`text-xl font-bold ${isCorrect ? "text-green-500" : "text-red-500"} text-center`}>
                {isCorrect
                  ? "Richtig!"
                  : `Falsch! Richtige Antwort: ${
                      Array.isArray(correctAnswer)
                        ? correctAnswer.map((i) => String.fromCharCode(65 + i)).join(", ")
                        : String.fromCharCode(65 + correctAnswer)
                    }.`}
              </p>
              {!isCorrect && (
                <Button
                  onClick={nextQuestion}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 w-full"
                >
                  Weiter
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}