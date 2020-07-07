const initialState = {
    message    : null,
    admin      : null,
    isLoggedIn : false
};
const authReducer  = (state = initialState, action) => {
    switch(action.type) {
        case 'LOG_IN':
            return {
                ...state,
                message    : 'Login Success',
                admin      : action.payload,
                isLoggedIn : true
            };
        case 'IS_LOGGED_IN':
            return state.admin ? true : false;
        case 'UPDATE':
            return {
                ...state,
                admin: action.payload
            };
        default: return state;
    }
}

export default authReducer;
