import { combineReducers } from 'redux'
import { manageSenators, manageBills } from './reducers'

export default combineReducers({
    manageSenators,
    manageBills
})