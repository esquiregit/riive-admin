import authReducer from './AuthReducer';
import regionsReducer from './RegionsReducer';
import sidebarReducer from './SidebarReducer';
import studentsReducer from './StudentsReducer';
import teachersReducer from './TeachersReducer';
import countriesReducer from './CountriesReducer';
import schoolFormReducer from './SchoolFormReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    authReducer,
    regionsReducer,
    sidebarReducer,
    studentsReducer,
    teachersReducer,
    countriesReducer,
    schoolFormReducer,
});

const rootReducer = (state, action) => {
    if(action.type === 'LOG_OUT') {
        state = undefined;
    }
    
    return appReducer(state, action);
};

export default rootReducer;
