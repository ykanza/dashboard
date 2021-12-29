import React, {useEffect, useRef, useState} from 'react';
import {Button, CircularProgress, Typography} from '@material-ui/core';
import {Form, Formik} from 'formik';
import { useNavigate } from "react-router-dom";

import validationSchema from '../FormModel/Login/validationSchema';
import formModel from '../FormModel/Login/formModel';
import formInitialValues from '../FormModel/Login/formInitialValues';

import useStyles from './styles';

import LoginForm from "../Forms/LoginForm";
import {Link} from "react-router-dom";
import MaterialLayout from "../Dashboard/MaterialLayout";
import axios from "axios";
import {ApiService} from "../Services/ApiService";
import {Alert} from "@mui/material";
import GoogleLogin from "../OAuth2/GoogleLogin";

const {formId, formField} = formModel;

export default function Login() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            navigate('/dashboard', {replace: true});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirect]);

    async function _handleSubmit(values, actions) {
        try {
            const response = await ApiService.clientWrapper('/auth/login', false, 'post', values);
            localStorage.setItem('accessToken', response.data.data.user.accessToken);
            setRedirect(true);
        } catch (e) {
            actions.setStatus('Invalid email address or password');
        }
        actions.setTouched({});
        actions.setSubmitting(false);
    }

    return (
        <React.Fragment>
            <MaterialLayout>
              <Formik
                      initialValues={formInitialValues}
                      validationSchema={validationSchema}
                      onSubmit={_handleSubmit}
                  >
                      {({isSubmitting, status}) => (
                          <Form id={formId}>
                              {status && <Alert severity="error" style={{marginBottom: 10}}>{status}</Alert>}
                              <LoginForm formField={formField}/>
                              <div className={classes.buttons}>
                                  <div className={classes.wrapper}>
                                      <Button
                                          disabled={isSubmitting}
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className={classes.button}
                                      >
                                          Se connecter
                                      </Button>
                                      {isSubmitting && (
                                          <CircularProgress
                                              size={24}
                                              className={classes.buttonProgress}
                                          />
                                      )}
                                  </div>
                              </div>
                              <Link to="/registration" style={{ textDecoration: 'none' }}>
                                  <Typography gutterBottom className={classes.typographyClass}>Créer un compte</Typography>
                              </Link>
                          </Form>
                      )}
                  </Formik>
                <GoogleLogin label="Se connecter avec Google" setRedirect={setRedirect} />
            </MaterialLayout>
        </React.Fragment>
    );
}
