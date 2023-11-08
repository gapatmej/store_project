import './shopping-cart.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type IShoppingProp = StateProps;

const getTotal = (productsOnCart) => {
  return productsOnCart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
}

export const ShoopingCart = (props) => {
  useEffect(() => {
  }, [props.productsOnCart]);

  return (
    <NavItem>
      <NavLink tag={Link} to="/order/pre-order" >
        <FontAwesomeIcon icon="shopping-cart" />
        <span>Cesta</span>
        <span>{getTotal(props.productsOnCart)}</span>
      </NavLink>
    </NavItem>
  )
};

const mapStateToProps = storeState => ({
  productsOnCart: storeState.product.productsOnCart,
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ShoopingCart);
