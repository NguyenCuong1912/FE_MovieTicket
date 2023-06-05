import { history } from "../../App";
import { quanLyCumRapServices } from "../../services/QuanLyCumRapServices";
import { GROUP_CINEMAS_EDIT, SET_GROUP_CINEMAS } from './../Types/QuanLyCumRapType';
import { message } from 'antd';
import { displayLoading, hiddenLoading } from "../../_core/Models/Loading";

export const layDanhSachCumRapAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyCumRapServices.layDanhSachCumRap();
            if (result.status === 200) {

                dispatch({
                    type: SET_GROUP_CINEMAS,
                    dataGroupCinemas: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const themCumRapAction = (cumRapCreate) => {
    return async dispatch => {
        try {
            const result = await quanLyCumRapServices.themCumRap(cumRapCreate);
            if (result.status === 201) {
                message.success("Thêm Thành Công");
                history.push(`/Admin/GroupCinemas`)
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error)
        }
    }
}
export const xoaCumRapAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyCumRapServices.xoaCumRap(id);
            if (result.status === 200) {
                message.success("Xóa thành công");
                dispatch(layDanhSachCumRapAction())
            }
        } catch (error) {
            console.log(error)
            message.success("Thất bại");
        }
    }
}
export const chiTietCumRapAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyCumRapServices.chiTietCumRap(id);
            if (result.status === 200) {
                dispatch({
                    type: GROUP_CINEMAS_EDIT,
                    groupCinemaEdit: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const capNhatCumRapAction = (id, groupCinemaEdit) => {
    return async dispatch => {
        try {
            const result = await quanLyCumRapServices.capNhatCumRap(id, groupCinemaEdit);
            if (result.status === 200) {
                message.success("Cập nhật thành công");
                history.push(`/Admin/GroupCinemas`)
            } else {
                message.error("Thất bại")
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error)
        }
    }
}