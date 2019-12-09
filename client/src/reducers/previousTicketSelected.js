import { GET_PREVIOUS_TICKETS } from '../actions/types'

export default (state = null, action) => {
    switch (action.type) {
        case GET_PREVIOUS_TICKETS:
            return action.payload
        default:
            return state;
    }
}