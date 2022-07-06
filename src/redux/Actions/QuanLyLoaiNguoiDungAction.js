import { message, Button, Space } from 'antd';
import { quanLyLoaiNguoiDungServices } from '../../services/QuanLyLoaiNguoiDung';
import { history } from './../../App';
import { EDIT_TYPE, SET_TYPE } from './../Types/QuanLyLoaiNguoiDungType';

export const LayDanhSachLoaiNguoiDungAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyLoaiNguoiDungServices.layDanhSachLoaiNguoiDung();
            if (result.status === 200) {
                dispatch({
                    type: SET_TYPE,
                    lstType: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const chiTietLoaiNguoiDungAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyLoaiNguoiDungServices.chiTietLoaiNguoiDung(id);
            if (result.status === 200) {
                dispatch({
                    type: EDIT_TYPE,
                    userTypeEdit: result.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const themLoaiNguoiDungAction = (dataCreate) => {
    return async dispatch => {
        try {
            const result = await quanLyLoaiNguoiDungServices.themLoaiNguoiDung(dataCreate);
            if (result.status === 201) {
                message.success("Thêm thành công");
                history.push(`/Admin/TypeUsers`)
            } else {
                message.error("Thêm Thất Bại");
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error)
        }
    }
}
export const xoaLoaiNguoiDungAction = (id) => {
    return async dispatch => {
        try {
            if (id === 1 || id === 2 || id === 3) {
                message.warning("Loại tài khoản này là mặc định bạn không thể xóa");
                return;
            }
            const result = await quanLyLoaiNguoiDungServices.xoaLoaiNguoiDung(id);
            if (result.status === 200) {
                await dispatch(LayDanhSachLoaiNguoiDungAction());
                message.success("Xóa Thành Công");

            }
        } catch (error) {
            message.error("Thất Bại");
        }
    }
}
export const capNhatLoaiNguoiDungAction = (id, dataEdit) => {
    return async dispatch => {
        try {
            if (id == 1 || id == 2 || id == 3) {
                message.warning("Loại tài khoản này là mặc định bạn không thể thay đổi ");
                return;
            }
            const result = await quanLyLoaiNguoiDungServices.capNhatLoaiNguoiDung(id, dataEdit);
            if (result.status === 200) {
                message.success("Cập nhật thành công");
                history.push(`/Admin/TypeUsers`)
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error)
        }
    }
}