import React from 'react';
import {Nav} from 'react-bootstrap';

function Navigation () {
  return (
          <Nav activeKey="/">
            <Nav.Item>
              <Nav.Link href="/">Front Page</Nav.Link>
            </Nav.Item>
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
  );
}

export default Navigation;