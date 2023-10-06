import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './order-item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderItemDetail = (props: IOrderItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { orderItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderItemDetailsHeading">
          <Translate contentKey="storeApp.salesOrderItem.detail.title">OrderItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="storeApp.salesOrderItem.description">Description</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.description}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="storeApp.salesOrderItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.quantity}</dd>
          <dt>
            <span id="pricePerItem">
              <Translate contentKey="storeApp.salesOrderItem.pricePerItem">Price Per Item</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.pricePerItem}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="storeApp.salesOrderItem.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.totalPrice}</dd>
          <dt>
            <Translate contentKey="storeApp.salesOrderItem.order">Order</Translate>
          </dt>
          <dd>{orderItemEntity.order ? orderItemEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order-item/${orderItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ orderItem }: IRootState) => ({
  orderItemEntity: orderItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemDetail);
