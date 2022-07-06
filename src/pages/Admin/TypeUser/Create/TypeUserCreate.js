import React from 'react'
import { useDispatch } from 'react-redux'
import {
    Form,
    Input,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { themLoaiNguoiDungAction } from '../../../../redux/Actions/QuanLyLoaiNguoiDungAction';
export default function TypeUserCreate(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            type: '',
            nameType: '',
        },
        validationSchema: Yup.object({
            type: Yup.string()
                .required("Không được trống !"),
            nameType: Yup.string()
                .required("Không được trống !"),
        }),
        onSubmit: (values) => {
            dispatch(themLoaiNguoiDungAction(values));
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
                    <Input name='type' onChange={formik.handleChange} />
                    {formik.errors.type && formik.touched.type && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.type}</p>
                    )}
                </Form.Item>
                <Form.Item label="Tên Loại Người Dùng">
                    <Input name='nameType' onChange={formik.handleChange} />
                    {formik.errors.nameType && formik.touched.nameType && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.nameType}</p>
                    )}
                </Form.Item>
                <div className='text-center '>
                    <button className='border bg-sky-300 text-white border-white px-5 py-2 rounded' type='submit' >Thêm</button>
                </div>
            </Form>
        </div>
    )
}
