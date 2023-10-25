import './product-card.scss';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductModal from '../product-modal/product-modal';

export const ProductCard = props => {
  const { product } = props;

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <ProductModal show={modalShow} onHide={() => setModalShow(false)} product={product} />
      <Col sm={4}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
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
                <Button variant="primary">Agregar</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default connect()(ProductCard);
