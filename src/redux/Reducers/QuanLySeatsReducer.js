import { ThongTinPhim } from "../../_core/Models/FilmModel";
import { CHON_GHE, CLEAR_VE_DANG_CHON, SET_LIST_GHE } from "../Types/QuanLySeatsType"

const initialState = {
    phongVe: {
        film: new ThongTinPhim(),
        lstGhe: []
    },
    listGheDangDat: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_LIST_GHE: {
            state.phongVe = action.phongVe;
            return { ...state }
        }
        case CHON_GHE: {
            let newListGheDangDat = [...state.listGheDangDat];
            const index = newListGheDangDat.findIndex(gheDD => gheDD.id === action.gheDuocChon.id);
            if (index !== -1) {
                newListGheDangDat.splice(index, 1);
            } else {
                newListGheDangDat.push(action.gheDuocChon);
            }
            return { ...state, listGheDangDat: newListGheDangDat }
        }
        case CLEAR_VE_DANG_CHON:
            return { ...state, listGheDangDat: [] }
        default:
            return state
    }
}
