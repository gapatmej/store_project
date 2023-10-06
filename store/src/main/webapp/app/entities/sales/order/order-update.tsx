import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './order.reducer';
import { IOrder } from 'app/shared/model/sales/order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderUpdate = (props: IOrderUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { orderEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/order' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.placedDate = convertDateTimeToServer(values.placedDate);

    if (errors.length === 0) {
      const entity = {
        ...orderEntity,
        ...values,
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
          <h2 id="storeApp.salesOrder.home.createOrEditLabel" data-cy="OrderCreateUpdateHeading">
            <Translate contentKey="storeApp.salesOrder.home.createOrEditLabel">Create or edit a Order</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : orderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="order-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="order-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="customerNameLabel" for="order-customerName">
                  <Translate contentKey="storeApp.salesOrder.customerName">Customer Name</Translate>
                </Label>
                <AvField
                  id="order-customerName"
                  data-cy="customerName"
                  type="text"
                  name="customerName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="customerIdLabel" for="order-customerId">
                  <Translate contentKey="storeApp.salesOrder.customerId">Customer Id</Translate>
                </Label>
                <AvField
                  id="order-customerId"
                  data-cy="customerId"
                  type="string"
                  className="form-control"
                  name="customerId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="placedDateLabel" for="order-placedDate">
                  <Translate contentKey="storeApp.salesOrder.placedDate">Placed Date</Translate>
                </Label>
                <AvInput
                  id="order-placedDate"
                  data-cy="placedDate"
                  type="datetime-local"
                  className="form-control"
                  name="placedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.orderEntity.placedDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="order-status">
                  <Translate contentKey="storeApp.salesOrder.status">Status</Translate>
                </Label>
                <AvInput
                  id="order-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && orderEntity.status) || 'COMPLETED'}
                >
                  <option value="COMPLETED">{translate('storeApp.OrderStatus.COMPLETED')}</option>
                  <option value="CANCELLED">{translate('storeApp.OrderStatus.CANCELLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="order-code">
                  <Translate contentKey="storeApp.salesOrder.code">Code</Translate>
                </Label>
                <AvField
                  id="order-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/order" replace color="info">
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
  orderEntity: storeState.order.entity,
  loading: storeState.order.loading,
  updating: storeState.order.updating,
  updateSuccess: storeState.order.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);
