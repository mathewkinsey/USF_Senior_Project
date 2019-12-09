import { GET_COMPARISON_COUNT } from '../actions/types'

export default (state = null, action) => {
    switch (action.type) {
        case GET_COMPARISON_COUNT:
            return action.payload
        default:
            return state;
    }
}