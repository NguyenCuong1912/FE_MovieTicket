import { GROUP_CINEMAS_EDIT, SET_GROUP_CINEMAS } from "../Types/QuanLyCumRapType"
import { CumRap } from '../../_core/Models/CumRapModel'
const initialState = {
    lstGroupCinemas: [],
    groupCinemaEdit: new CumRap()
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_GROUP_CINEMAS: {
            state.lstGroupCinemas = action.dataGroupCinemas;
            return { ...state }
        }
        case GROUP_CINEMAS_EDIT: {
            state.groupCinemaEdit = action.groupCinemaEdit;
            return { ...state }
        }

        default:
            return state
    }
}
