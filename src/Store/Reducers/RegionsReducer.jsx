const initialState = {
    regions : []
};
const regionsReducer  = (state = initialState, action) => {
    switch(action.type) {
        case 'STORE_REGIONS':
            return {
                ...state,
                regions : action.payload
            };
        default:
            return state;
    }
}

export default regionsReducer;
