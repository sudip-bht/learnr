'use client'; // Marks this as a Client Component

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Watchparty = () => {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      correctAnswer: 'Paris',
      start_time: 60, 
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      start_time: 45, 
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
      correctAnswer: 'Mars',
      start_time: 90, 
    },
    {
      question: 'Who wrote "Hamlet"?',
      options: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Leo Tolstoy'],
      correctAnswer: 'William Shakespeare',
      start_time: 30, 
    },
    {
      question: 'Which is the largest ocean?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 'Pacific Ocean',
      start_time: 15, 
    },
  ];

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswerCorrect, setIsAnswerCorrect] = useState({});

  // Handle answer selection and validation
  const handleAnswerSelect = (questionIndex, option) => {
    const correctAnswer = questions[questionIndex].correctAnswer;
    const isCorrect = option === correctAnswer;
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
    setIsAnswerCorrect({ ...isAnswerCorrect, [questionIndex]: isCorrect });
  };

  // Format seconds into "MM:SS" format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle time click
  const handleTimeClick = (time) => {
    alert(`Video time: ${formatTime(time)}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">Watchparty</h1>

      {/* Button to toggle the quiz */}
      <Button
        className="bg-blue-500 p-5 text-base rounded-xl w-[100px] hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 mb-6"
        onClick={() => setShowQuiz(!showQuiz)}
      >
        {showQuiz ? 'Hide Quiz' : 'Quiz me'}
      </Button>

      {/* Show quiz if "Quiz me" is clicked */}
      {showQuiz && (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className={`border p-4 rounded-md shadow-md transition-all duration-500 
                ${
                  selectedAnswers[index]
                    ? isAnswerCorrect[index]
                      ? 'shadow-green-500'
                      : 'shadow-red-500'
                    : 'shadow-lg'
                }`}
            >
              {/* Display clickable start time */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{q.question}</h2>
                <button
                  onClick={() => handleTimeClick(q.start_time)}
                  className="text-blue-500 underline text-sm"
                >
                  Start second: {(q.start_time)}
                </button>
              </div>

              {/* Render the options */}
              <div className="space-y-2 mt-2">
                {q.options.map((option, i) => (
                  <label
                    key={i}
                    className="block bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      className="mr-2"
                      checked={selectedAnswers[index] === option}
                      onChange={() => handleAnswerSelect(index, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>

              {/* Show feedback if an answer is selected */}
              {selectedAnswers[index] && (
                <div
                  className={`mt-4 text-lg font-medium ${
                    isAnswerCorrect[index] ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isAnswerCorrect[index]
                    ? 'Correct!'
                    : `Wrong! The correct answer is ${q.correctAnswer}`}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchparty;
