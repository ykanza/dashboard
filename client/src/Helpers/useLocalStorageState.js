export const useLocalStorageState = ({key, value, setState = true}) => {
    let initialValue;
    let isObject = typeof value === 'object';

    if (isObject) {
        const parsedLocalStorage = JSON.parse(localStorage.getItem(key) || '{}');
        initialValue = Object.keys(parsedLocalStorage).length > 0 ? parsedLocalStorage : value;
    } else {
        initialValue = localStorage.getItem(key) || value;
    }
    const [localStorageState, setLocalStorageState] = React.useState(initialValue);
    const handleUpdateLocalStorageState = React.useCallback((x) => {
            if (setState)
                setLocalStorageState(x);
            localStorage.setItem(key, (isObject ? JSON.stringify(x) : x));
        },
        [isObject, key, setState]
    );

    return [localStorageState, handleUpdateLocalStorageState];
};
