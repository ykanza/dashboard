import React, {useEffect, useRef, useState} from 'react';
import {Button, CircularProgress, Typography} from '@material-ui/core';
import {Form, Formik} from 'formik';

import validationSchema from '../FormModel/Registration/validationSchema';
import formModel from '../FormModel/Registration/formModel';
import formInitialValues from '../FormModel/Registration/formInitialValues';

import {Link} from "react-router-dom";

import useStyles from './styles';

import RegistrationForm from "../Forms/RegistrationForm";
import MaterialLayout from "../Dashboard/MaterialLayout";
import { useNavigate } from "react-router-dom";
import {ApiService} from "../Services/ApiService";
import {Alert} from "@mui/material";
import GoogleLogin from "../OAuth2/GoogleLogin";

const {formId, formField} = formModel;

export default function Registration() {
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
            const response = await ApiService.clientWrapper('/auth/register', false, 'post', values);
            localStorage.setItem('accessToken', response.data.data.user.accessToken);
            setRedirect(true);
        } catch (e) {
            actions.setStatus('User already exist');
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
                              <RegistrationForm formField={formField}/>

                              <div className={classes.buttons}>
                                  <div className={classes.wrapper}>
                                      <Button
                                          disabled={isSubmitting}
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className={classes.button}
                                      >
                                          S'inscrire
                                      </Button>
                                      {isSubmitting && (
                                          <CircularProgress
                                              size={24}
                                              className={classes.buttonProgress}
                                          />
                                      )}
                                  </div>
                              </div>
                              <Link to="/login" style={{ textDecoration: 'none' }}>
                                  <Typography gutterBottom className={classes.typographyClass}>Se connecter</Typography>
                              </Link>
                          </Form>
                      )}
                  </Formik>
                <GoogleLogin label="S'inscrire avec Google" setRedirect={setRedirect} />
            </MaterialLayout>
        </React.Fragment>
    );
}
