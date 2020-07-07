export const logIn = admin => {
    return {
        type    : 'LOG_IN',
        payload : admin
    };
}

export const isLoggedIn = () => {
    return { type: 'IS_LOGGED_IN' }
}

export const update = admin => {
    return {
        type    : 'UPDATE',
        payload : admin
    }
}
