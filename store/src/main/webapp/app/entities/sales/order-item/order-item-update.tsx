import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOrder } from 'app/shared/model/sales/order.model';
import { getEntities as getOrders } from 'app/entities/sales/order/order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './order-item.reducer';
import { IOrderItem } from 'app/shared/model/sales/order-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderItemUpdate = (props: IOrderItemUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { orderItemEntity, orders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/order-item');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOrders();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...orderItemEntity,
        ...values,
        order: orders.find(it => it.id.toString() === values.orderId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="storeApp.salesOrderItem.home.createOrEditLabel" data-cy="OrderItemCreateUpdateHeading">
            <Translate contentKey="storeApp.salesOrderItem.home.createOrEditLabel">Create or edit a OrderItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : orderItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="order-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="order-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descriptionLabel" for="order-item-description">
                  <Translate contentKey="storeApp.salesOrderItem.description">Description</Translate>
                </Label>
                <AvField
                  id="order-item-description"
                  data-cy="description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="quantityLabel" for="order-item-quantity">
                  <Translate contentKey="storeApp.salesOrderItem.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="order-item-quantity"
                  data-cy="quantity"
                  type="string"
                  className="form-control"
                  name="quantity"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="pricePerItemLabel" for="order-item-pricePerItem">
                  <Translate contentKey="storeApp.salesOrderItem.pricePerItem">Price Per Item</Translate>
                </Label>
                <AvField
                  id="order-item-pricePerItem"
                  data-cy="pricePerItem"
                  type="string"
                  className="form-control"
                  name="pricePerItem"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="totalPriceLabel" for="order-item-totalPrice">
                  <Translate contentKey="storeApp.salesOrderItem.totalPrice">Total Price</Translate>
                </Label>
                <AvField
                  id="order-item-totalPrice"
                  data-cy="totalPrice"
                  type="text"
                  name="totalPrice"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="order-item-order">
                  <Translate contentKey="storeApp.salesOrderItem.order">Order</Translate>
                </Label>
                <AvInput id="order-item-order" data-cy="order" type="select" className="form-control" name="orderId">
                  <option value="" key="0" />
                  {orders
                    ? orders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/order-item" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  orders: storeState.order.entities,
  orderItemEntity: storeState.orderItem.entity,
  loading: storeState.orderItem.loading,
  updating: storeState.orderItem.updating,
  updateSuccess: storeState.orderItem.updateSuccess,
});

const mapDispatchToProps = {
  getOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemUpdate);
