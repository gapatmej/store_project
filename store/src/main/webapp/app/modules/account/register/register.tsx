import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export interface IRegisterProps extends StateProps, DispatchProps { }

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      props.reset();
    },
    []
  );

  const handleValidSubmit = (event, values) => {
    const { username, firstName, lastName, email, firstPassword } = values;
    console.log("handleValidSubmit", values);
    props.handleRegister(username, firstName, lastName, email, firstPassword, props.currentLocale);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            <Translate contentKey="register.title">Registration</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label={translate('global.form.username.label')}
              placeholder={translate('global.form.username.placeholder')}
              validate={{
                required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                pattern: {
                  value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                  errorMessage: translate('register.messages.validate.login.pattern'),
                },
                minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') },
              }}
              data-cy="username"
            />
            <Row>
              <Col md="6">
                <AvField
                  name="firstName"
                  label="Nombres"
                  placeholder="Nombres"
                  validate={{
                    required: { value: true, errorMessage: "Nombres requeridos" },
                    maxLength: { value: 255, errorMessage: "La longitud máxima es de 255" },
                  }}
                />
              </Col>
              <Col md="6">
                <AvField
                  name="lastName"
                  label="Apellidos"
                  placeholder="Apellidos"
                  validate={{
                    required: { value: true, errorMessage: "Apellidos requeridos" },
                    maxLength: { value: 255, errorMessage: "La longitud máxima es de 255" },
                  }}
                />
              </Col>
            </Row>
            <AvField
              name="email"
              label={translate('global.form.email.label')}
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') },
              }}
              data-cy="email"
            />
            <AvField
              name="firstPassword"
              label={translate('global.form.newpassword.label')}
              placeholder={translate('global.form.newpassword.placeholder')}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label={translate('global.form.confirmpassword.label')}
              placeholder={translate('global.form.confirmpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') },
              }}
              data-cy="secondPassword"
            />
            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              <Translate contentKey="register.form.button">Register</Translate>
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
