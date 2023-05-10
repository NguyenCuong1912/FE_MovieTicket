import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatLoaiNguoiDungAction, chiTietLoaiNguoiDungAction } from '../../../../redux/Actions/QuanLyLoaiNguoiDungAction';
import {
    Form,
    Input,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from "yup";
export default function TypeUserEdit(props) {
    const dispatch = useDispatch();
    const { userTypeEdit } = useSelector(state => state.QuanLyLoaiNguoiDungReducer);
    useEffect(() => {
        dispatch(chiTietLoaiNguoiDungAction(props.match.params.id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            type: userTypeEdit.type,
            nameType: userTypeEdit.nameType,
        },
        validationSchema: Yup.object({
            type: Yup.string()
                .required("Không được trống !"),
            nameType: Yup.string()
                .required("Không được trống !"),
        }),
        onSubmit: (values) => {
            dispatch(capNhatLoaiNguoiDungAction(props.match.params.id, values));
        },
    })
    return (
        <div>
            <h2 className='text-center my-4 text-2xl'>Thêm Rạp Chiếu</h2>
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
                <Form.Item label="Loại Người Dùng">
                    <Input name='type' value={formik.values.type} onChange={formik.handleChange} />
                    {formik.errors.type && formik.touched.type && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.type}</p>
                    )}
                </Form.Item>
                <Form.Item label="Tên Loại Người Dùng">
                    <Input name='nameType' value={formik.values.nameType} onChange={formik.handleChange} />
                    {formik.errors.nameType && formik.touched.nameType && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.nameType}</p>
                    )}
                </Form.Item>
                <div className='text-center '>
                    <button className='border bg-yellow-300 text-white border-white px-5 py-2 rounded' type='submit' >Cập Nhật</button>
                </div>
            </Form>
        </div>
    )
}
