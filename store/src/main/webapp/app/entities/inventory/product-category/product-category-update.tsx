import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduct } from 'app/shared/model/inventory/product.model';
import { getEntities as getProducts } from 'app/entities/inventory/product/product.reducer';
import { ICategory } from 'app/shared/model/inventory/category.model';
import { getEntities as getCategories } from 'app/entities/inventory/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product-category.reducer';
import { IProductCategory } from 'app/shared/model/inventory/product-category.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductCategoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductCategoryUpdate = (props: IProductCategoryUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { productCategoryEntity, products, categories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/product-category');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProducts();
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productCategoryEntity,
        ...values,
        product: products.find(it => it.id.toString() === values.productId.toString()),
        category: categories.find(it => it.id.toString() === values.categoryId.toString()),
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
          <h2 id="storeApp.inventoryProductCategory.home.createOrEditLabel" data-cy="ProductCategoryCreateUpdateHeading">
            <Translate contentKey="storeApp.inventoryProductCategory.home.createOrEditLabel">Create or edit a ProductCategory</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productCategoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-category-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="product-category-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="product-category-product">
                  <Translate contentKey="storeApp.inventoryProductCategory.product">Product</Translate>
                </Label>
                <AvInput id="product-category-product" data-cy="product" type="select" className="form-control" name="productId">
                  <option value="" key="0" />
                  {products
                    ? products.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="product-category-category">
                  <Translate contentKey="storeApp.inventoryProductCategory.category">Category</Translate>
                </Label>
                <AvInput id="product-category-category" data-cy="category" type="select" className="form-control" name="categoryId">
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product-category" replace color="info">
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
  products: storeState.product.entities,
  categories: storeState.category.entities,
  productCategoryEntity: storeState.productCategory.entity,
  loading: storeState.productCategory.loading,
  updating: storeState.productCategory.updating,
  updateSuccess: storeState.productCategory.updateSuccess,
});

const mapDispatchToProps = {
  getProducts,
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryUpdate);
