import './left-home.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { getPublicEntities } from 'app/entities/inventory/category/category.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ILeftHomeProps extends StateProps, DispatchProps {}

export const LeftHome = (props: ILeftHomeProps) => {
  useEffect(() => {
    props.getPublicEntities();
  }, []);

  return (
    <div className="panel-container">
      <h2>Categorías</h2>
      {props.categoryList.map(c => {
        return (
          <label key={c.id} className="form-control">
            <input type="checkbox" name="checkbox" />
            {c.name}
          </label>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ category }: IRootState) => ({
  categoryList: category.entities,
});

const mapDispatchToProps = {
  getPublicEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LeftHome);