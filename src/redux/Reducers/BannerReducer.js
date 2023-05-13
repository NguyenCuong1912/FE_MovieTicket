import { SET_BANNER, SET_DETAIL_BANNER } from "../Types/ManageBannerType";

const initialState = {
  lstBanner: [],
  detailBanner: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, data }) => {
  switch (type) {
    case SET_BANNER: {
      return { ...state, lstBanner: data };
    }
    case SET_DETAIL_BANNER: {
      return { ...state, detailBanner: data };
    }

    default:
      return state;
  }
};
