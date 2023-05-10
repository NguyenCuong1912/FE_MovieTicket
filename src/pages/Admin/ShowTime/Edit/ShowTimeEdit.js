import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber
} from 'antd';
import { capNhatLichChieuAction, chiTietLichChieuAction } from '../../../../redux/Actions/QuanLyLichChieuAction';
import { layDanhSachCumRapAction } from '../../../../redux/Actions/QuanLyCumRapAction';
import { quanLyRapChieuServices } from '../../../../services/QuanLyRapChieuServices';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { layDanhSachPhimAction } from '../../../../redux/Actions/QuanLyPhimAction';
import { quanLyPhongServices } from '../../../../services/QuanLyPhongServices';
import { layDanhSachPhongAction } from '../../../../redux/Actions/QuanLyPhongAction';
import { layDanhSachRapChieuAction } from '../../../../redux/Actions/QuanLyRapChieuAction';
import { quanLySeatsServices } from '../../../../services/QuanLySeatsServices';
export default function ShowTimeEdit(props) {
    const dispatch = useDispatch();
    const { showTimeEdit } = useSelector(state => state.QuanLyLichChieuReducer);
    const { lstPhim } = useSelector(state => state.QuanLyPhimReducer);
    const { lstGroupCinemas } = useSelector(state => state.QuanLyCumRapReducer);
    const { lstPhong } = useSelector(state => state.QuanLyPhongReducer);
    const { lstRapChieu } = useSelector(state => state.QuanLyRapChieuReducer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        dispatch(chiTietLichChieuAction(props.match.params.id));
        dispatch(layDanhSachPhimAction());
        dispatch(layDanhSachCumRapAction());
        dispatch(layDanhSachPhongAction());
        dispatch(layDanhSachRapChieuAction());
        try {
            const result = await quanLySeatsServices.getPriceSeat(props.match.params.id);
            if (result.status === 200) {
                await setState({
                    ...state, price: Number(result.data.price)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    const [state, setState] = useState({ lstRap: lstRapChieu, lstRoom: lstPhong, price: 0 })
    const changeGroupCinema = async (value) => {
        formik.setFieldValue('idGroupCinema', value)
        const result = await quanLyRapChieuServices.layRapChieuTheoMaCumRap(value);
        if (result.status === 200) {
            formik.setFieldValue('idCinema', '')
            formik.setFieldValue('idRoom', '')
            await setState({
                ...state, lstRap: result.data
            })
        }
    }
    const changeCinema = async (value) => {
        formik.setFieldValue('idCinema', value)
        const result = await quanLyPhongServices.layPhongTheoIDCinema(value);
        if (result.status === 200) {
            formik.setFieldValue('idRoom', '')
            await setState({ ...state, lstRoom: result.data })
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            idFilm: showTimeEdit.film?.id,
            showDate: showTimeEdit?.showDate,
            idCinema: showTimeEdit.cinema?.id,
            idRoom: showTimeEdit.room?.id,
            idGroupCinema: showTimeEdit.cinema?.idGroupCinema,
            price: state.price
        },
        validationSchema: Yup.object({
            idRoom: Yup.string()
                .required("Không được trống !"),
            idCinema: Yup.string()
                .required("Không được trống !"),
            idFilm: Yup.string()
                .required("Không được trống !"),
            showDate: Yup.string()
                .required("Không được để trống !")
        }),
        onSubmit: (values) => {
            const { id } = props.match.params;
            dispatch(capNhatLichChieuAction(id, values));
        },
    })
    const handleChange = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    function onOk(value) {
        const time = moment(value).format("YYYY-MM-DD hh:mm:ss")
        formik.setFieldValue('showDate', time)
    }
    const { Option } = Select;

    return (
        <div>
            <h2 className='text-center my-4 text-2xl'>Cập Nhật Lịch Chiếu</h2>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: 'default',
                }}
                size='default'
            >
                <Form.Item label="Tên Phim">
                    <Select
                        showSearch
                        style={{ width: 500 }}
                        placeholder="Chọn Phim"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        value={formik.values.idFilm}
                        onChange={handleChange('idFilm')}
                    >
                        {lstPhim.map((film, index) => {
                            return <Option key={index} value={film.id}>{film.nameFilm}</Option>
                        })}
                    </Select>
                    {formik.errors.idFilm && formik.touched.idFilm && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.idFilm}</p>
                    )}
                </Form.Item>
                <Form.Item label="Cụm Rạp">
                    <Select
                        showSearch
                        style={{ width: 500 }}
                        placeholder="Chọn Cụm Rạp"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={changeGroupCinema}
                        value={formik.values.idGroupCinema}
                    >
                        {lstGroupCinemas.map((groupCinema, index) => {
                            return <Option key={index} value={groupCinema.id}>{groupCinema.groupName}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Rạp">
                    <Select
                        showSearch
                        style={{ width: 500 }}
                        placeholder="Chọn Rạp"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }

                        value={formik.values.idCinema}
                        onChange={changeCinema}
                    >
                        {state.lstRap?.map((cinema, index) => {
                            return <Option key={index} value={cinema.id}>{cinema.name}</Option>
                        })}
                    </Select>
                    {formik.errors.idCinema && formik.touched.idCinema && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.idCinema}</p>
                    )}
                </Form.Item>
                <Form.Item label="Phòng">
                    <Select
                        showSearch
                        style={{ width: 500 }}
                        placeholder="Chọn Phòng"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={handleChange('idRoom')}
                        value={formik.values.idRoom}
                    >
                        {state.lstRoom.map((room, index) => {
                            return <Option key={index} value={room.id}>{room.roomName}</Option>
                        })}
                    </Select>
                    {formik.errors.idRoom && formik.touched.idRoom && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.idRoom}</p>
                    )}
                </Form.Item>
                <Form.Item label='Ngày chiếu'>
                    <DatePicker format="DD/MM/YYYY hh:mm:ss" value={moment(formik.values.showDate)} showTime onOk={onOk} />
                    {formik.errors.showDate && formik.touched.showDate && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.showDate}</p>
                    )}
                </Form.Item>
                <Form.Item label='Giá vé'>
                    <InputNumber value={formik.values.price} min={0} defaultValue={0} onChange={handleChange('price')} />
                    {formik.errors.price && formik.touched.price && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.price}</p>
                    )}
                </Form.Item>
                <div className='text-center '>
                    <button className='border bg-sky-300 text-white border-white px-5 py-2 rounded' type='submit' >Thêm</button>
                </div>
            </Form>
        </div>
    )
}
