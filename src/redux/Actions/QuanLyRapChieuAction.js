import { quanLyRapChieuServices } from "../../services/QuanLyRapChieuServices"
import { RAP_CHIEU_EDIT, SET_RAP_CHIEU } from './../Types/QuanLyRapChieuType';
import { message } from 'antd';
import { history } from "../../App";

export const layDanhSachRapChieuAction = (name = '') => {
    return async dispatch => {
        try {
            const result = await quanLyRapChieuServices.layDanhSachRap(name);
            if (result.status === 200) {
                dispatch({
                    type: SET_RAP_CHIEU,
                    lstRapChieu: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const themRapAction = (dataCreate) => {
    return async dispatch => {
        try {
            const result = await quanLyRapChieuServices.themRap(dataCreate);
            if (result.status === 201) {
                message.success("Thêm thành công");
                history.push(`/Admin/Cinemas`);
            }
        } catch (error) {
            message.error("Thất Bại")
            console.log(error)
        }
    }
}
export const chiTietRapAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyRapChieuServices.chiTietRap(id);
            if (result.status === 200) {
                dispatch({
                    type: RAP_CHIEU_EDIT,
                    rapChieuEdit: result.data
                })

            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const capNhatRapChieuAction = (id, dataEdit) => {
    return async dispatch => {
        try {
            const result = await quanLyRapChieuServices.capNhatRap(id, dataEdit);
            if (result.status === 200) {
                message.success("Cập nhật thành công");
                history.push(`/Admin/Cinemas`);
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error)
        }
    }
}
export const xoaRapChieuAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyRapChieuServices.xoaRap(id);
            if (result.status === 200) {
                message.success("Xóa thành công");
                await dispatch(layDanhSachRapChieuAction());
                history.push(`/Admin/Cinemas`);
            } else {
                message.error("Thất bại");
            }
        } catch (error) {
            message.error("Thất bại");
            console.log(error)
        }
    }
}