import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
    error: {
        "&.react-tel-input .form-control": {
            borderColor: "#d32f2f!important",
            color: "#d32f2f!important",
            boxShadow: "0px 0px 0px 0px #d32f2f!important",
        },
        "&.react-tel-input .form-control:focus": {
            boxShadow: "0px 0px 0px 1px #d32f2f!important",
        },
        "& #placeholder": {
            color: "#d32f2f!important",
        }
    },
    containerClass: {
        "&.react-tel-input .form-control": {
            width: '100%!important'
        },
        "&.react-tel-input .special-label": {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '75%',
        },
    },
    smallRadioButton: {
        "& svg": {
            width: "1.3em",
            height: "1.3em"
        },
    },
    dropzone: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#b3aaaa',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#b3aaaa',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        marginTop: 20,
        marginBottom: 20,
        cursor: 'pointer'
    },
    title: {
        fontWeight: 700,
        color: '#5e5b5bee',
        fontSize: 13
    },
    required: {
        color: 'red',
        fontSize: 20
    },
    description: {
        fontSize: 12,
        color: '#8b8b8bee',
        marginBottom: 10
    },
    circularProgressContainer: {
        textAlign: 'center',
        marginTop: 40,
    },
    uploadIcon: {
        marginLeft: 2,
        marginBottom: -6
    }
}));
