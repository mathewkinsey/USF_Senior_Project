import {GET_RESULTS} from '../actions/types'

export default (state = null, action) =>{
    switch(action.type){
        case GET_RESULTS:
            return action.payload
        default:
            return state;
    }
}