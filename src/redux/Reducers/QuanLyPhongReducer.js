import { PHONG_EDIT, SET_LIST_PHONG } from "../Types/QuanLyPhongType"
import { Phong } from './../../_core/Models/RoomModel';
const initialState = {
    lstPhong: [],
    phongEdit: new Phong()
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_LIST_PHONG: {
            state.lstPhong = action.lstPhong;
            return { ...state }
        }
        case PHONG_EDIT: {
            state.phongEdit = action.phongEdit;
            return { ...state }
        }
        default:
            return state
    }
}
