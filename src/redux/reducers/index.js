import {combineReducers} from 'redux';
import {authReducer} from "../reducers/authReducer";
import {postsReducer} from './postsReducer';
import {uiReducer} from './uiReducer';
import {commentsReducer} from './commentsReducer';
import { bloggerReducer } from './bloggerReducer';


const reducers = combineReducers({
auth: authReducer,
posts: postsReducer,
ui: uiReducer,
comments: commentsReducer,
bloggers: bloggerReducer
});

export default reducers;

