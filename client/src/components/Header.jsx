import React from 'react';
import {Nav,Navbar,NavDropdown,Container,FormControl,Form,Button} from 'react-bootstrap';

function Header() {
  return (
       /* 1. ВЕРХНЯЯ ПАНЕЛЬ (Pills) */
       <div>
        <Nav variant="pills" fill defaultActiveKey="/home" className="p-2 bg-dark">
        <Nav.Item>
          <Nav.Link href="/home" className="text-white">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="text-white">Much longer nav link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" className="text-white" disabled>Disabled</Nav.Link>
        </Nav.Item>
      </Nav>
            {/* 2. ХЭДЕР (Лого слева, меню по центру)  bg="light"  */}
      <header className="two" id="myHeader">
        <Navbar  expand="lg" className="">
          <Container fluid>
            <Navbar.Brand href="/" className="text-white">MY-LOGO</Navbar.Brand>
            <Navbar.Toggle className='navbar-light-color' aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
              {/* className="mx-auto" выравнивает меню по центру */}
              <Nav className="mx-auto">
                <Nav.Link href="#inventory">Инвентарь</Nav.Link>
                <Nav.Link href="/videos" >Видео</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Form className="d-flex">
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      </div>
    // <div>
    //   <h2>Header</h2>
    // </div>
  )
}

export {Header};
