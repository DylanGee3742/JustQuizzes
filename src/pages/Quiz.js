import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import QuizCard from '../Components/QuizCard'
import { Container, Row, Col } from 'react-bootstrap'
import ResultsCard from '../Components/ResultsCard'

export default function Quiz() {
  const slug = useParams().slug
  const [result, setResult] = useState(null)


  const loadResult = async (result) => {
    setResult(result)
  }

  return (
    <div>
      <Container fluid>
      <Row mt={5}>
        <Col></Col>
        <Col xs={10} md={8} lg={7} xl={6}>
        {result !== null ? <ResultsCard result={result} /> : <QuizCard loadResult={loadResult}/>}
        </Col>
        <Col></Col>
      </Row>
      </Container>
    </div>
  )
}
