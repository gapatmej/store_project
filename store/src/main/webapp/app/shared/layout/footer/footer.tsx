import './footer.scss';

import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "react-bootstrap-icons";
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

const Footer = () => (
  <Container className='containerFooter' fluid>
    <Row>
      <Col md="12" >
        <Row>
          <Col md="4">
            <ul className="list-unstyled">
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Nuestra empresa
                    </span>
                  </NavLink>
                </NavItem>
              </li>
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Gastos de envío
                    </span>
                  </NavLink>
                </NavItem>
              </li>
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Descuentos
                    </span>
                  </NavLink>
                </NavItem>
              </li>
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Contacto
                    </span>
                  </NavLink>
                </NavItem>
              </li>
            </ul>
          </Col>
          <Col md="4">
            <ul className="list-unstyled">
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Información personal
                    </span>
                  </NavLink>
                </NavItem>
              </li>
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Pedidos
                    </span>
                  </NavLink>
                </NavItem>
              </li>
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Mis alertas
                    </span>
                  </NavLink>
                </NavItem>
              </li>
              <li>
                <NavItem>
                  <NavLink tag={Link} to="/" className="d-flex align-items-center">
                    <span>
                      Direcciones
                    </span>
                  </NavLink>
                </NavItem>
              </li>
            </ul>
          </Col>
          <Col md="4">
            <div className="rounded-social-buttons">
              <a className="social-button facebook" href="https://www.facebook.com/">
                <Facebook />
              </a>
              <a className="social-button twitter" href="https://www.twitter.com/">
                <Twitter />
              </a>
              <a className="social-button linkedin" href="https://www.linkedin.com/">
                <Linkedin />
              </a>
              <a className="social-button youtube" href="https://www.youtube.com/">
                <Youtube />
              </a>
              <a className="social-button instagram" href="https://www.instagram.com/">
                <Instagram />
              </a>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Footer;
