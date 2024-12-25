"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ControllingQuiz() {
  const [data, setData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== "undefined") {
        const context = require.context("@/data", true, /\.json$/);
        const loadedData = {};

        context.keys().forEach((key) => {
          const path = key.split("/");
          const subject = path[1];
          const topic = path[2].replace(".json", "");

          if (!loadedData[subject]) {
            loadedData[subject] = {};
          }

          loadedData[subject][topic] = context(key);
        });

        setData(loadedData);
      }
    };

    loadData();
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setQuestions(data[selectedSubject][topic]);
    setCurrentQuestion(0);
    setSelectedOptions([]);
    setAnswers({});
    setScore(0);
    setShowResults(false);
  };

  const handleAnswer = (selectedIndex = null) => {
    const question = questions[currentQuestion];
    let correct = false;

    switch (question.type) {
      case "true_false":
      case "multiple_choice":
        correct = selectedIndex === question.correct;
        break;

      case "fill_in_the_blank":
        if (Array.isArray(question.correct)) {
          correct = JSON.stringify(selectedOptions) === JSON.stringify(question.correct);
        } else {
          correct = selectedIndex === question.correct;
        }
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
      setTimeout(() => nextQuestion(), 1500);
    }
  };

  const toggleOption = (index) => {
    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleFillInBlank = (blankIndex, choiceIndex) => {
    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[blankIndex] = choiceIndex;
      return updated;
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsCorrect(null);
      setCorrectAnswer(null);
      setSelectedOptions([]);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setSelectedSubject(null);
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
            {option}
          </Button>
        ));

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
            <p className="mb-4">Ordnen Sie die Elemente in der richtigen Reihenfolge:</p>
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => toggleOption(index)}
                className={`w-full text-left justify-start p-4 ${
                  selectedOptions.includes(index) ? "bg-gray-300 cursor-not-allowed" : ""
                }`}
                disabled={selectedOptions.includes(index)}
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
              disabled={selectedOptions.length !== question.options.length}
              className={`mt-4 ${
                selectedOptions.length === question.options.length
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Antwort bestätigen
            </Button>
          </>
        );

      case "fill_in_the_blank":
        if (!question.options) {
          return <p>Keine Optionen verfügbar.</p>;
        }

        if (Array.isArray(question.options) && typeof question.options[0] === "string") {
          return (
            <div>
              <p className="mb-4">{question.question}</p>
              {question.options.map((option, index) => (
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
                  {option}
                </Button>
              ))}
            </div>
          );
        }

        if (Array.isArray(question.options) && typeof question.options[0] === "object") {
          return (
            <div>
              <p className="mb-4">{question.question}</p>
              {question.options.map((option, blankIndex) => (
                <div key={blankIndex} className="mb-6">
                  <p className="font-semibold">Wählen Sie das Wort für Lücke {option.blank}:</p>
                  {option.choices.map((choice, choiceIndex) => (
                    <Button
                      key={choiceIndex}
                      onClick={() => handleFillInBlank(blankIndex, choiceIndex)}
                      className={`w-full text-left justify-start p-4 ${
                        selectedOptions[blankIndex] === choiceIndex ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {choice}
                    </Button>
                  ))}
                </div>
              ))}
              <Button
                onClick={() => handleAnswer()}
                disabled={selectedOptions.length !== question.options.length}
                className={`mt-4 ${
                  selectedOptions.length === question.options.length
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Antwort bestätigen
              </Button>
            </div>
          );
        }

        return <p>Ungültiges Fragenformat.</p>;

      default:
        return <p>Unbekannter Fragentyp</p>;
    }
  };

  if (!selectedSubject) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Wählen Sie ein Fach</h2>
          <div className="space-y-4">
            {Object.keys(data).map((subject) => (
              <Button
                key={subject}
                onClick={() => handleSubjectSelect(subject)}
                className="w-full text-left justify-start p-4"
              >
                {subject}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!selectedTopic) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Thema wählen</h2>
          <div className="space-y-4">
            {Object.keys(data[selectedSubject]).map((topic) => (
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
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Testergebnisse</h2>
          <p className="text-xl mb-4 text-center">
            Richtige Antworten: {score} von {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>
          <Button onClick={restartQuiz} className="mt-6 bg-blue-500 hover:bg-blue-600 w-full">
            Zurück zur Fächerwahl
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <CardContent>
        <Button onClick={restartQuiz} className="mb-4 bg-gray-500 hover:bg-gray-600 w-full">
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