import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

function Navigation () {
  return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Warehouse App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
            <Nav.Item>
              <Nav.Link href="/jackets">Jackets</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/shirts">Shirts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/accessories">Accessories</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Navigation;