import { ADD_USER, SET_LIST_USER, SIGN_OUT, USER_EDIT } from "../Types/QuanLyNguoiDungType"
let userDefault = {};
if (sessionStorage.getItem("USER_LOGIN")) {
    userDefault = JSON.parse(sessionStorage.getItem("USER_LOGIN"))
}
const initialState = {
    userLogin: userDefault,
    userEdit: {
        email: '',
        password: '',
        phoneNumber: '',
        userName: '',
        typeUser: ''
    },
    listUser: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            state.userLogin = action.user;
            return { ...state }
        }
        case SET_LIST_USER: {
            state.listUser = action.lstUser;
            return { ...state }
        }
        case USER_EDIT: {
            state.userEdit = action.userEdit;
            return { ...state }
        }
        case SIGN_OUT: {
            sessionStorage.clear();
            return { ...state, userLogin: {} }
        }

        default:
            return state
    }
}
