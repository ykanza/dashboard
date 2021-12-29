const formModel = {
    formId: 'formId',
    formField: {
        email: {
            name: 'email',
            label: 'Adresse email*',
            requiredErrorMsg: 'Ce champ est requis.',
            emailErrorMsg: "Format de l'email invalide.",
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
