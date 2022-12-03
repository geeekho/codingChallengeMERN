import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeesSlice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const userPersistConfig = {
    key: 'user',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['isAuthenticated', 'user'],
};

const employeePersistConfig = {
    key: 'employee',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['employees'],
};

const rootReducer = combineReducers({
    auth: persistReducer(userPersistConfig, authReducer),
    employees: persistReducer(employeePersistConfig, employeeReducer)
});

export { rootPersistConfig, rootReducer };