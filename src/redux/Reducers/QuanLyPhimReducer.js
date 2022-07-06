import _ from 'lodash';
import { ThongTinPhim } from '../../_core/Models/FilmModel';
import { PHIM_DANG_CHIEU, PHIM_EDIT, PHIM_SAP_CHHIEU, SET_PHIM } from '../Types/QuanLyPhimType'
const initialState = {
    lstPhim: [],
    lstPhimDefault: [],
    phimEdit: new ThongTinPhim()
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_PHIM: {
            state.lstPhim = action.dataPhim;
            state.lstPhimDefault = action.dataPhim;
            return { ...state }
        }
        case PHIM_EDIT: {
            state.phimEdit = action.phimEdit;
            return { ...state }
        }
        case PHIM_DANG_CHIEU: {
            state.lstPhim = _.filter(state.lstPhimDefault, { nowShowing: true })
            return { ...state }
        }
        case PHIM_SAP_CHHIEU: {
            state.lstPhim = _.filter(state.lstPhimDefault, { comingSoon: true })
            return { ...state }
        }
        default:
            return state
    }
}
