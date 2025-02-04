import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap'

export default function ResultsCard({ result }) {
    const slug = useParams().slug
    return (
        <>
            <Container className="mt-5">

                <Card>
                    <Card.Header className="text-center">{slug}</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <h3>{result}</h3>
                        </Card.Title>
                        <Card.Text>
                            <p>Text</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
};

