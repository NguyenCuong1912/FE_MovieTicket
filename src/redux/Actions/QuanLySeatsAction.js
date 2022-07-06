import { quanLySeatsServices } from "../../services/QuanLySeatsServices"
import { SET_LIST_GHE } from './../Types/QuanLySeatsType';

export const themSeatsAction = (dataCreate) => {
    return async dispatch => {
        try {
            console.log("sett", dataCreate)
            const result = await quanLySeatsServices.themSeats(dataCreate);
            if (result.status === 201) {
                console.log("seats", result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const layDanhSachGheTheoLichChieu = (idShowTime) => {
    return async dispatch => {
        try {
            const result = await quanLySeatsServices.layDanhSachGheTheoLichCHieu(idShowTime);
            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_GHE,
                    phongVe: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}