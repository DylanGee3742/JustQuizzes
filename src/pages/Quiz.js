import React, { useState } from 'react'
import QuizCard from '../Components/QuizCard'
import { Container, Row, Col } from 'react-bootstrap'
import ResultsCard from '../Components/ResultsCard'

export default function Quiz() {
  const [result, setResult] = useState(null)

  const loadResult = async (result) => {
    setResult(result)
  }

  return (
    <div>
      <Container fluid>
      <Row mt={5}>
        <Col></Col>
        <Col xs={6}>
        {result !== null ? <ResultsCard result={result} /> : <QuizCard loadResult={loadResult}/>}
        </Col>
        <Col></Col>
      </Row>
      </Container>
    </div>
  )
}
