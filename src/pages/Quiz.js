import React from 'react'
import QuizCard from '../Components/QuizCard'
import { Container, Row, Col } from 'react-bootstrap'

export default function Quiz() {
  return (
    <div>
      <Container fluid>
      <Row mt={5}>
        <Col></Col>
        <Col xs={6}><QuizCard /></Col>
        <Col></Col>
      </Row>
      </Container>
    </div>
  )
}
