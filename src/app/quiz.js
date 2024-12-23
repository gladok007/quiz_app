"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Динамическая загрузка вопросов из JSON-файлов
export default function ControllingQuiz() {
  const [topics, setTopics] = useState({}); // Темы и вопросы
  const [selectedTopic, setSelectedTopic] = useState(null); // Выбранная тема
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // Загрузка тем
  useEffect(() => {
    const loadTopics = async () => {
      const context = require.context('@/data/topics', false, /\.json$/);
      const loadedTopics = {};

      for (const key of context.keys()) {
        const topicName = key.replace('./', '').replace('.json', ''); // Название темы = имя файла
        const data = await context(key);
        loadedTopics[topicName] = data;
      }

      setTopics(loadedTopics);
    };

    loadTopics();
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleAnswer = (optionIndex) => {
    const questions = topics[selectedTopic];
    const correct = questions[currentQuestion].correct === optionIndex;
    setIsCorrect(correct);
    setCorrectAnswer(correct ? null : questions[currentQuestion].correct);
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setIsCorrect(null);
      setCorrectAnswer(null);
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    const questions = topics[selectedTopic];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setShowResults(false);
  };

  const goToMenu = () => {
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setShowResults(false);
  };

  if (!selectedTopic) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Thema wählen</h2>
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
          <h2 className="text-2xl font-bold mb-4">Testergebnisse</h2>
          <p className="text-xl mb-4">
            Richtige Antworten: {score} von {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>
          <div className="mt-6 space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="text-left p-4 border rounded">
                <p className="font-medium">{q.question}</p>
                <div className="mt-2 flex flex-col">
                  <p className="mr-2">
                    Ihre Antwort: {answers[index] !== undefined ? `${String.fromCharCode(65 + answers[index])}. ${q.options[answers[index]]}` : 'Keine Antwort'}
                  </p>
                  {answers[index] !== q.correct && (
                    <p className="text-red-500">
                      Richtige Antwort: {`${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button onClick={restart} className="mt-6 bg-blue-500 hover:bg-blue-600">
            Zurück zur Themenauswahl
          </Button>
        </CardContent>
      </Card>
    );
  }

  const questions = topics[selectedTopic];
  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <CardContent>
        <div className="text-center">
          <div className="mb-4">
            <Button onClick={goToMenu} className="mb-4 bg-gray-500 hover:bg-gray-600">
              Zurück
            </Button>
            <p className="text-sm text-gray-500">
              Frage {currentQuestion + 1} von {questions.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left justify-start p-4"
                variant={answers[currentQuestion] === index ? "secondary" : "outline"}
              >
                {`${String.fromCharCode(65 + index)}. ${option}`}
              </Button>
            ))}
          </div>

          {isCorrect !== null && (
            <div className="mt-4">
              <p className={`text-xl font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {isCorrect ? "Richtig!" : "Falsch!"}
              </p>
              {!isCorrect && correctAnswer !== null && (
                <p className="text-lg text-gray-700">
                  Richtige Antwort: {`${String.fromCharCode(65 + correctAnswer)}. ${questions[currentQuestion].options[correctAnswer]}`}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}