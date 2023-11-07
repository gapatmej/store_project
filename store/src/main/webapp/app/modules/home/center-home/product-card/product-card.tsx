import './product-card.scss';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductModal from '../product-modal/product-modal';
import { addProduct } from 'app/entities/inventory/product/product.reducer';

export const ProductCard = props => {
  const { product } = props;

  const [modalShow, setModalShow] = React.useState(false);

  const handleAddProduct= ()=>{
    props.addProduct(product);
  }

  return (
    <>
      <ProductModal show={modalShow} onHide={() => setModalShow(false)} product={product} />
      <Col sm={4}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`data:${product.imageContentType};base64,${product.image}`} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{product.price}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Row>
              <Col>
                <Card.Link onClick={() => setModalShow(true)}>Ver detalles</Card.Link>
              </Col>
              <Col>
                <Button onClick={() => handleAddProduct()} variant="primary">Agregar</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
