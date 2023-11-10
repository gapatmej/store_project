import './center-home.scss';
import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './product-card/product-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export type ICenterHomeProp = StateProps;

export const CenterHome = (props: ICenterHomeProp) => {
  return (
    <Container>
      <Row>
        {props.products.map(i => {
          return <ProductCard key={i} product={i} />;
        })}
      </Row>
    </Container>
  );
};

const mapStateToProps = storeState => ({
  products: storeState.product.entities,
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CenterHome);
