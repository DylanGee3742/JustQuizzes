import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap'

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
        <>
            <Container className='mt-5'>
                {question && (
                    <Card>
                        <Card.Header className='text-center'>{slug}</Card.Header>
                        <Card.Body>
                            <Card.Title> <h3>{question.question}</h3></Card.Title>
                            <Card.Text>
                                {question.options?.map((opt) => (
                                    <ListGroup>
                                        <ListGroup.Item> 
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
                                        </ListGroup.Item>
                                    </ListGroup>
                                ))}
                            </Card.Text>
                            {questionNumber == 0 ? <button onClick={() => setQuestionNumber(questionNumber + 1)}>Forward</button> :
                                <Row>
                                    <Col>
                                    <Button variant="light" className="d-flex border 1px solid black justify-content-start" onClick={() => setQuestionNumber(questionNumber - 1)}>Back</Button>
                                    </Col>
                                    <Col className='d-flex justify-content-end'>
                                    <Button variant="light" className="border" onClick={() => setQuestionNumber(questionNumber + 1)}>Forward</Button>
                                    </Col>
                                </Row>
                            }
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    )
}
