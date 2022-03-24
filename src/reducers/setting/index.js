import {
    combineReducers
} from 'redux';
import general from './general';
import lang from './lang';

export default combineReducers({
    general,
    lang
});