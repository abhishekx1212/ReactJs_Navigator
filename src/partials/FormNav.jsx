import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FormNav = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" style={{marginBottom:20}} className='rounded-4 shadow-lg' >
        <Container>
          <Navbar.Brand>React Forms</Navbar.Brand>
          <Nav className="me-auto">
            <Link className='link' to={"/"} >User Form</Link>
            <Link className='link' to={"/userFormData"} >User Form Data</Link>
            <Link className='link' to={"/feedForm"} >Feedback</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default FormNav
