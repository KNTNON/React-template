import {
    combineReducers
} from 'redux';

import auth from './auth/index';
import setting from './setting/index';

export default combineReducers({
    auth,
    setting,
});