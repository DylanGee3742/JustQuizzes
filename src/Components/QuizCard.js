import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function QuizCard() {
    const slug = useParams().slug
    const [questionAnswers, setQuestionAnswers] = useState([])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [question, setQuestion] = useState([])

    const getQuestionsAnswers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/quiz/${slug}`)
            setQuestionAnswers(response.data)
        } catch (e) {
            console.error('Error fetching questions & answers: ', e)
        }
    }

    const findAndDisplayQuestion = async () => {
        if (questionNumber == 0) {
            setQuestion([])
        }
        for (let i = 0; i < questionAnswers.length; i++) {
            if (questionAnswers[i].id == questionNumber) {
                setQuestion(questionAnswers[i])
            }
        }
    }

    const handleRadioChange = (value) => {
        console.log(value)
    }

    useEffect(() => {
        getQuestionsAnswers()
    }, [])


    useEffect(() => {
        findAndDisplayQuestion()
    }, [questionNumber])


    return (
        <div>
            {slug}

            {question && (
                <>
                    <h3>{question.question}</h3>
                    {question.options?.map((opt) => (
                        <label key={opt.label}>
                            <input
                                type="radio"
                                name="quiz" // Ensures only one can be selected
                                value={opt.value}
                                // checked={selectedAnswer === opt.value}
                                onChange={() => handleRadioChange(opt.value)}
                            />
                            {opt.label}
                        </label>
                    ))}
                </>
            )}

            {questionNumber == 0 ? <button onClick={() => setQuestionNumber(questionNumber + 1)}>Forward</button> :
                <div >
                    <button onClick={() => setQuestionNumber(questionNumber - 1)}>Back</button>
                    <button onClick={() => setQuestionNumber(questionNumber + 1)}>Forward</button>
                </div>
            }

        </div>
    )
}
