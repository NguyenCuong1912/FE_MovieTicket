
import { DISPLAY_LOADING, HIDDEN_LOADING } from './../Types/LoadingType';

const initialState = {
    isLoading: true,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case DISPLAY_LOADING:
            return { ...state, isLoading: false }
        case HIDDEN_LOADING:
            return { ...state, isLoading: true }
        default:
            return state
    }
}
