import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap'

export default function ResultsCard({ result }) {
    const [description, setDescription] = useState('')
    const slug = useParams().slug

    const getResultsData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/results/${slug}/${result}`)
  
            setDescription(response.data[0].description)
        } catch (e) {
            console.error('Error getting results data:', e)
        }
    }

    useEffect(() => {
        getResultsData()
    }, [])

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
                            <p>{description}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
};
