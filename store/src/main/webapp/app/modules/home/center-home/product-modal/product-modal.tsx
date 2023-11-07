import './product-modal.scss';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export const ProductModal = props => {
  const { product } = props;
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={5}>
              <Card.Img variant="top" src={`data:${product.imageContentType};base64,${product.image}`}  />
            </Col>
            <Col md={7}>
              <Row>
                <h4>{product.name}</h4>
              </Row>
              <Row>
                <p>{product.description}</p>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect()(ProductModal);
