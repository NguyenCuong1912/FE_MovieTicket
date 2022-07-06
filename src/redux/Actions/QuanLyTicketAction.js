import { message } from "antd"
import { CLEAR_VE_DANG_CHON } from "../Types/QuanLySeatsType";
import { quanLyTicketServices } from './../../services/QuanLyTicketServices';
import { SET_CHANGE_TABS, SET_LIST_TICKET_WITH_USER } from './../Types/QuanLyTicketType';
import { layDanhSachGheTheoLichChieu } from './QuanLySeatsAction'
export const datVe = (dataCreate) => {
    return async dispatch => {
        try {
            const result = await quanLyTicketServices.datVe(dataCreate);
            if (result.status === 201) {
                await dispatch({
                    type: CLEAR_VE_DANG_CHON
                })
                sessionStorage.removeItem("STORE")
                await dispatch(layDanhSachGheTheoLichChieu(dataCreate.idShowTime))
                await dispatch(danhSachVeTheoUserAction(dataCreate.userId))
                await dispatch({
                    type: SET_CHANGE_TABS,
                    number: 2
                })
                // await message.success("Đặt vé thành công");
            }
        } catch (error) {
            // message.error("Thất Bại");
            console.log(error)
        }
    }
}

export const danhSachVeTheoUserAction = (idUser) => {
    return async dispatch => {
        try {
            const result = await quanLyTicketServices.danhSachVeTheoUser(idUser);
            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_TICKET_WITH_USER,
                    lstTicketWithUser: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}