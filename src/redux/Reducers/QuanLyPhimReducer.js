import _ from "lodash";
import { ThongTinPhim } from "../../_core/Models/FilmModel";
import {
  ALL_PHIM,
  PHIM_DANG_CHIEU,
  PHIM_EDIT,
  PHIM_SAP_CHHIEU,
  SEARCH_PHIM,
  SET_PHIM,
} from "../Types/QuanLyPhimType";
const initialState = {
  lstPhim: [],
  lstPhimDefault: [],
  lstSearchPhim: [],
  phimEdit: new ThongTinPhim(),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PHIM: {
      state.lstPhim = action.dataPhim;
      state.lstPhimDefault = action.dataPhim;
      return { ...state };
    }
    case SEARCH_PHIM: {
      state.lstSearchPhim = action.dataSearch;
      return { ...state };
    }

    case PHIM_EDIT: {
      state.phimEdit = action.phimEdit;
      return { ...state };
    }
    case PHIM_DANG_CHIEU: {
      state.lstPhim = _.filter(state.lstPhimDefault, { nowShowing: true });
      return { ...state };
    }
    case PHIM_SAP_CHHIEU: {
      state.lstPhim = _.filter(state.lstPhimDefault, { comingSoon: true });
      return { ...state };
    }
    case ALL_PHIM: {
      state.lstPhim = state.lstPhimDefault;
      return { ...state };
    }
    default:
      return state;
  }
};
