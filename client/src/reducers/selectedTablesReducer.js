import { GET_SELECTED_TABLES } from '../actions/types'

export default (state = null, action) => {
    switch (action.type) {
        case GET_SELECTED_TABLES:
            return action.payload
        default:
            return state;
    }
}