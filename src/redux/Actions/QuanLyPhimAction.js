import { history } from '../../App';
import { quanLyPhimServices } from '../../services/QuanLyPhimServices'
import { PHIM_EDIT, SET_PHIM } from '../Types/QuanLyPhimType';
import { message } from 'antd';
export const layDanhSachPhimAction = (name = '') => {
    return async dispatch => {
        try {
            const result = await quanLyPhimServices.layDanhSachPhim(name);
            if (result.status === 200) {
                dispatch({
                    type: SET_PHIM,
                    dataPhim: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const themPhimAction = (dataFilm) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimServices.themPhim(dataFilm);
            if (result.status === 201) {
                message.success("Thêm phim thành công");
                history.push('/Admin/Films');
            } else {
                message.error('Thất Bại');
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error);
        }
    }
}

export const layChiTietPhimAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimServices.layChiTietPhim(id);
            if (result.status === 200) {
                dispatch({
                    type: PHIM_EDIT,
                    phimEdit: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const capNhatPhimAction = (id, phimEdit) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimServices.capNhatPhim(id, phimEdit);
            if (result.status === 200) {
                message.success("Cập nhật thành công");
                history.push(`/Admin/Films`)
            } else {
                message.error("Cập nhật thất bại");
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error);
        }
    }
}
export const xoaPhimAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimServices.xoaPhim(id);
            if (result.status === 200) {
                await dispatch(layDanhSachPhimAction());
                message.success("Xóa thành công");
                history.push(`/Admin/Films`);
            } else {
                message.error("Xóa Thất Bại");
            }
        } catch (error) {
            message.error("Thất Bại");
            console.log(error);
        }
    }
}