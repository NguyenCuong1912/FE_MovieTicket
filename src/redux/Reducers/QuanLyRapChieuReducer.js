import { RAP_CHIEU_EDIT, SET_RAP_CHIEU } from "../Types/QuanLyRapChieuType"
import { Cinemas } from '../../_core/Models/CinemaModel'
const initialState = {
    lstRapChieu: [],
    rapChieuEdit: new Cinemas()
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RAP_CHIEU: {
            state.lstRapChieu = action.lstRapChieu
            return { ...state }
        }
        case RAP_CHIEU_EDIT: {
            state.rapChieuEdit = action.rapChieuEdit
            return { ...state }
        }
        default:
            return state
    }
}
