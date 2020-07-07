const initialState = {
    values : [
        // { email      : '' },
        // { phone      : '' },
        // { region     : '' },
        // { country    : '' },
        // { website    : '' },
        // { location   : '' },
        // { username   : '' },
        // { schoolname : '' }
    ]
};
const schoolFormReducer  = (state = initialState, action) => {
    switch(action.type) {
        case 'STORE_SCHOOL_FORM_VALUES':
            return {
                ...state,
                values : action.payload
            };
        default:
            return state;
    }
}

export default schoolFormReducer;
