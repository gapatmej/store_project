import './center-home.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPublicEntities, getEntities } from 'app/entities/inventory/product/product.reducer';
import ProductCard from './product-card/product-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export type ICenterHomeProp = StateProps;

export const CenterHome = (props: ICenterHomeProp) => {
  const handleChangeCategories = () => {
    const name = '';
    const page = 0;
    const size = 0;
    const sort = false;
    if (props.categoriesSelected.length > 0) {
      props.getPublicEntities(props.categoriesSelected, name, page, size, sort);
    }
  };

  useEffect(() => {
    handleChangeCategories();
  }, [props.categoriesSelected]);
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
  getPublicEntities,
  getEntities,
  products: storeState.product.entities,
  categoriesSelected: storeState.category.categoriesSelected,
});

const mapDispatchToProps = {
  getPublicEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CenterHome);
