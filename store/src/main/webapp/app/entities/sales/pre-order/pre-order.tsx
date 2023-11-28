import './pre-order.scss';
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, InputGroup, Row } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { changeQuantityProductCart, deleteProduct } from 'app/entities/inventory/product/product.reducer';
import { Card, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPreEntity, reset } from '../order/order.reducer';
import { parseISO, format } from 'date-fns';

export interface IOrderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const PreOrder = (props) => {

  const { productsOnCart, orderEntity, isAuthenticated } = props;

  const handleChangeQuantity = (event, product) => {
    const quantity = event.target.valueAsNumber;
    if (quantity > 0) {
      props.changeQuantityProductCart(product.id, event.target.valueAsNumber);
    }
  }

  const getTotal = () => {
    let total = 0.00;
    productsOnCart.forEach(p => {
      total += p.quantity * p.price;
    });
    return total.toFixed(2);
  }

  const getTotalItems = () => {
    let totalItems = 0;
    productsOnCart.forEach(p => {
      totalItems += p.quantity
    });
    return totalItems;
  }

  const reserve = () => {

    if (!isAuthenticated) {
      props.history.push('/login');
      return;
    }

    const entity = {
      "orderItems": productsOnCart.map(p => ({
        productId: p.id,
        quantity: p.quantity
      }))
    };

    props.createPreEntity(entity);
  }

  useEffect(() => {
    return () => {
      props.reset();
    };
  }, []);

  const shoppingCar = (<div>
    <h2 id="order-heading" data-cy="OrderHeading">
      Carrito de compras
    </h2>

    <Container fluid className='container-list'>
      <Row>
        <Col md={9}>
          {productsOnCart.map(product => {
            return (
              <Row className='row-list' key={product.id}>
                <Col md={2}>
                  <Card.Img variant="top" src={`data:${product.imageContentType};base64,${product.image}`} />
                </Col>
                <Col md={8} >
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <InputGroup>
                    <AvForm>
                      <AvField className="quantity" name="quantity" label="Cantidad" type="number" onChange={(event) => handleChangeQuantity(event, product)}
                        min="1" value={product.quantity} />
                    </AvForm>
                    <div className='form-group delete-icon'>
                      <FontAwesomeIcon icon="trash" size='lg' onClick={() => props.deleteProduct(product)} />
                    </div>
                  </InputGroup>
                </Col>
                <Col md={2} >
                  <h4>$ {product.price}</h4>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col md={3}>
          <Card >
            <Card.Header className="text-center">Resumen</Card.Header>
            <Card.Body>
              <Card.Title>Total a pagar</Card.Title>
              <Card.Text>
                $ {getTotal()}
              </Card.Text>
              <Button variant="primary" disabled={getTotalItems() <= 0} onClick={() => reserve()}>Reservar</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{getTotalItems()} productos</Card.Footer>
          </Card>
        </Col>
      </Row>

    </Container>

  </div>)

  const preOrder = () => {
    const dateISO = parseISO(orderEntity.placedDate);
    return (<div>
      <h2>
        Resumen de la Orden
      </h2>

      <Container fluid className='container-list'>
        <Form>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Nombre</Form.Label>
            <Form.Control value={orderEntity.customerName} disabled />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Fecha de la transacción</Form.Label>
              <Form.Control value={format(dateISO, 'dd-MM-yyyy HH:mm')} disabled />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Estado</Form.Label>
              <Form.Control value={orderEntity.status} disabled />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Código</Form.Label>
              <Form.Control value={orderEntity.code} disabled />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Total</Form.Label>
              <Form.Control value={orderEntity.total} disabled />
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>

    </div>)
  };

  return orderEntity && orderEntity.id ? preOrder() : shoppingCar;
};

const mapStateToProps = storeState => ({
  productsOnCart: storeState.product.productsOnCart,
  orderEntity: storeState.order.entity,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

const mapDispatchToProps = {
  changeQuantityProductCart,
  deleteProduct,
  createPreEntity,
  reset
};


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PreOrder);
