import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerGoals from './reducerGoals';
import completeGoals from './reducerCompletedGoals';

export default combineReducers({
    user: reducerUser,
    goals: reducerGoals,
    completeGoals: completeGoals
})