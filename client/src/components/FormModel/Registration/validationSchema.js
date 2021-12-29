import * as Yup from 'yup';
import formModel from './formModel';

const {
    formField: {
        username,
        email,
        emailConfirmation,
        password
    }
} = formModel;

const validationSchema = Yup.object().shape({
        username: Yup.string().required(`${username.requiredErrorMsg}`),
        email: Yup.string().email(`${email.emailErrorMsg}`).required(`${email.requiredErrorMsg}`),
        emailConfirmation: Yup.string()
            .email(emailConfirmation.emailErrorMsg)
            .required(`${emailConfirmation.requiredErrorMsg}`)
            .oneOf([Yup.ref('email'), null], `${emailConfirmation.confirmationErrorMsg}`),
        password: Yup.string()
            .required(`${password.requiredErrorMsg}`)
            .min(8, `${password.passwordErrorMsg}`)
    });

export default validationSchema;
