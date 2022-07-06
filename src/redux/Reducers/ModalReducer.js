import { OPEN_MODAL_TRAILER, CLOSE_MODAL_TRAILER } from '../Types/ModalType'
const initialState = {
    changeActive: false,
    phim: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case OPEN_MODAL_TRAILER:
            return { ...state, changeActive: true, phim: action.data }
        case CLOSE_MODAL_TRAILER:
            return { ...state, changeActive: false, phim: {} }
        default:
            return state
    }
}
