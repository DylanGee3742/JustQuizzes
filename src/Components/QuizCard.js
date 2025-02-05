import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap'


export default function QuizCard({loadResult}) {
    const slug = useParams().slug
    const [questionAnswers, setQuestionAnswers] = useState([])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [question, setQuestion] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [finalResult, setFinalResult] = useState(null);

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

    const handleRadioChange = (questionId, selectedValue) => {
        setSelectedAnswer((prev) => ({
            ...prev,
            [questionId]: selectedValue
        }));
    }

    const calculateResult = () => {
        const answerCounts = {};
    
        // Iterate through selected answers
        Object.values(selectedAnswer).forEach((answerArray) => {
            // Ensure it's an array, then count each answer sign separately
            (Array.isArray(answerArray) ? answerArray : [answerArray]).forEach((answer) => {
                answerCounts[answer] = (answerCounts[answer] || 0) + 1;
            });
        });
    
        // Find the answer with the highest count
        const mostFrequentanswer = Object.keys(answerCounts).reduce((a, b) =>
            answerCounts[a] > answerCounts[b] ? a : b
        );
    
        loadResult(mostFrequentanswer)
    };
    

    useEffect(() => {
        getQuestionsAnswers()
    }, [])

    useEffect(() => {
        findAndDisplayQuestion()
    }, [questionNumber])

    return (
        <>
            <Container className="mt-5">
                {question && (
                    <Card>
                        <Card.Header className="text-center">{slug}</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <h3>{question.question}</h3>
                            </Card.Title>
                            <Card.Text>
                                {question.options?.map((opt) => (
                                    <ListGroup key={opt.label}>
                                        <ListGroup.Item>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`} // Ensures only one can be selected
                                                    value={opt.value}
                                                    checked={selectedAnswer[question.id] === opt.value}
                                                    onChange={() => handleRadioChange(question.id, opt.value)}
                                                />
                                                {opt.label}
                                            </label>
                                        </ListGroup.Item>
                                    </ListGroup>
                                ))}
                            </Card.Text>

                            {/* Navigation Buttons */}
                            {questionNumber === 0 ? (
                                <Row>
                                    <Col className="d-flex justify-content-end">
                                        <Button variant='light' className='border' onClick={() => setQuestionNumber(questionNumber + 1)}>Forward</Button>
                                    </Col>
                                </Row>
                            ) : questionNumber === 10 ? (
                                <Row>
                                    <Col>
                                        <Button
                                            variant="light"
                                            className="d-flex border 1px solid black justify-content-start"
                                            onClick={() => setQuestionNumber(questionNumber - 1)}
                                        >
                                            Back
                                        </Button>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        {selectedAnswer[question.id] && (
                                            <Button variant="light" className="border" onClick={calculateResult}>
                                                Finish
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            ) : (
                                <Row>
                                    <Col>
                                        <Button
                                            variant="light"
                                            className="d-flex border 1px solid black justify-content-start"
                                            onClick={() => setQuestionNumber(questionNumber - 1)}
                                        >
                                            Back
                                        </Button>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        {selectedAnswer[question.id] && (
                                            <Button
                                                variant="light"
                                                className="border"
                                                onClick={() => setQuestionNumber(questionNumber + 1)}
                                            >
                                                Forward
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    )
};    