import './product-modal.scss';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { addProduct } from 'app/entities/inventory/product/product.reducer';

export const ProductModal = props => {
  const handleAddProduct= ()=>{
    props.addProduct(product);
  }

  const { product } = props;
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container >
          <Row className='row'>
            <Col md={5}>
              <Card.Img variant="top" height={"350"} src={`data:${product.imageContentType};base64,${product.image}`}  />
            </Col>
            <Col md={7} >
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h4>$ {product.price}</h4>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => handleAddProduct()} >
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
