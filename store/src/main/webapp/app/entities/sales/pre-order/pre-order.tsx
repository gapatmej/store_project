import './pre-order.scss';
import React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { changeQuantityProductCart } from 'app/entities/inventory/product/product.reducer';
import { Card, Container } from 'react-bootstrap';

export interface IOrderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const PreOrder = (props) => {

  const { productsOnCart } = props;

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

  return (
    <div>
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
                    <AvForm>
                      <AvField className="quantity" name="quantity" label="Cantidad" type="number" onChange={(event) => handleChangeQuantity(event, product)}
                        min="1" value={product.quantity} />
                    </AvForm>
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
                <Button variant="primary">Reservar</Button>
              </Card.Body>
              <Card.Footer className="text-muted">{getTotalItems()} productos</Card.Footer>
            </Card>
          </Col>
        </Row>

      </Container>

    </div>
  );
};

const mapStateToProps = storeState => ({
  productsOnCart: storeState.product.productsOnCart,
});

const mapDispatchToProps = {
  changeQuantityProductCart,
};


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PreOrder);
