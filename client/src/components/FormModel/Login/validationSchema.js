import * as Yup from 'yup';
import formModel from './formModel';

const {
    formField: {
        email,
        password
    }
} = formModel;

const validationSchema = Yup.object().shape({
        email: Yup.string().email(`${email.emailErrorMsg}`).required(`${email.requiredErrorMsg}`),
        password: Yup.string()
            .required(`${password.requiredErrorMsg}`)
            .min(8, `${password.passwordErrorMsg}`)
    });

export default validationSchema;
