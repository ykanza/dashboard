const formModel = {
    formId: 'formId',
    formField: {
        username: {
            name: 'username',
            label: "Nom d'utilisateur*",
            requiredErrorMsg: 'Ce champ est requis.'
        },
        email: {
            name: 'email',
            label: 'Adresse email*',
            requiredErrorMsg: 'Ce champ est requis.',
            emailErrorMsg: "Format de l'email invalide.",
        },
        emailConfirmation: {
            name: 'emailConfirmation',
            label: 'Confirmez votre adresse email*',
            requiredErrorMsg: 'Ce champ est requis.',
            emailErrorMsg: "Format de l'email invalide.",
            confirmationErrorMsg: "Email de confirmation ne correspond pas.",
        },
        password: {
            name: 'password',
            label: 'Mot de passe*',
            requiredErrorMsg: 'Ce champ est requis.',
            passwordErrorMsg: "le mot de passe doit contenir au minimum 8 caractères.",
        }
    }
};

export default formModel;
