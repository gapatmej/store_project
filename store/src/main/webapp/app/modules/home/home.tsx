import './home.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import LeftHome from 'app/modules/home/left-home/left-home';
import CenterHome from './center-home/center-home';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col md="3" className="pad">
        <LeftHome />
      </Col>
      <Col md="9">
        <CenterHome />
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
