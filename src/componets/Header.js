import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
  return (
    <div  style={{background: 'linear-gradient(0deg, rgba(1,18,40,1) 0%, rgba(38,66,71,1) 100%)'}}>
      <Navbar>
        <Container>
          <Navbar.Brand className='text-white fw-bolder fs-1'>BookStore</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
