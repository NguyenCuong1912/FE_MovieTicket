import { EDIT_TYPE, SET_TYPE } from "../Types/QuanLyLoaiNguoiDungType"
import { TypeUser } from '../../_core/Models/TypeUserModel'
const initialState = {
    lstType: [],
    userTypeEdit: new TypeUser()
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TYPE: {
            state.lstType = action.lstType;
            return { ...state }
        }
        case EDIT_TYPE: {
            state.userTypeEdit = action.userTypeEdit;
            return { ...state }
        }
        default:
            return state
    }
}
