import { GET_TOTAL_COMPARISONS } from '../actions/types'

export default (state = null, action) => {
    switch (action.type) {
        case GET_TOTAL_COMPARISONS:
            return action.payload
        default:
            return state;
    }
}