import { LICH_CHIEU_EDIT, SET_LICH_CHIEU, SET_LICH_CHIEU_THEO_HE_THONG_RAP } from './../Types/QuanLyLichChieuType';
import { ShowTime } from '../../_core/Models/ShowTimeModel'
const initialState = {
    lstShowTime: [],
    showTimeEdit: new ShowTime(),
    showTime: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_LICH_CHIEU: {
            state.lstShowTime = action.lstShowTime
            return { ...state }
        }
        case LICH_CHIEU_EDIT: {
            state.showTimeEdit = action.showTimeEdit
            return { ...state }
        }
        case SET_LICH_CHIEU_THEO_HE_THONG_RAP: {
            state.showTime = action.showTime;
            return { ...state }
        }

        default:
            return state
    }
}
