import React, { useState } from 'react'
import {
    Form,
    Input,
    InputNumber,
    Switch,
    DatePicker
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from "yup";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimAction } from '../../../../redux/Actions/QuanLyPhimAction';

export default function FilmCreate(props) {
    const dispatch = useDispatch();
    const [srcImg, setSrcImg] = useState('');
    const formik = useFormik({
        initialValues: {
            nameFilm: '',
            trailer: '',
            description: '',
            showtime: moment(Date.now()).format("YYYY-MM-DD"),
            nowShowing: false,
            comingSoon: false,
            rate: 10,
            imgFilm: {},
        },
        validationSchema: Yup.object({
            nameFilm: Yup.string()
                .required("Không được trống !"),
            trailer: Yup.string()
                .required("Không được trống !"),
            description: Yup.string()
                .required("Không được trống !"),
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            for (var key in values) {
                if (key !== 'imgFilm') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('films', values.imgFilm, values.imgFilm.name)
                }
            }
            dispatch(themPhimAction(formData));

        },
    })
    const handleDate = (value) => {
        formik.setFieldValue('showtime', value?.format('YYYY-MM-DD'));
    }
    const handleNumberAndSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleFile = (e) => {
        // lấy file từ event
        const file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            // tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setSrcImg(e.target.result)
            }
            formik.setFieldValue('imgFilm', file)
        }

    }
    return (
        <div>
            <h2 className='text-center my-4 text-2xl'>Thêm Phim</h2>
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
                    <Input name='nameFilm' onChange={formik.handleChange} />
                    {formik.errors.nameFilm && formik.touched.nameFilm && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.nameFilm}</p>
                    )}
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <Input name='description' onChange={formik.handleChange} />
                    {formik.errors.description && formik.touched.description && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.description}</p>
                    )}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} />
                    {formik.errors.trailer && formik.touched.trailer && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.trailer}</p>
                    )}
                </Form.Item>
                <Form.Item label="Đánh Giá">
                    <InputNumber name='rate' defaultValue='10' min='1' max='10' onChange={handleNumberAndSwitch('rate')} />
                </Form.Item>
                <Form.Item label="Ngày Chiếu">
                    <DatePicker defaultValue={moment()} format='DD-MM-YYYY' onChange={handleDate} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name='comingSoon' onChange={handleNumberAndSwitch('comingSoon')} />
                </Form.Item>
                <Form.Item label="Đang Chiếu" valuePropName="checked">
                    <Switch name='nowShowing' onChange={handleNumberAndSwitch('nowShowing')} />
                </Form.Item>
                <Form.Item label="Ảnh">
                    <input type='file' name='imgFilm' onChange={handleFile} accept=".jpg, .jpeg, .png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={srcImg} alt={`${srcImg}...`} />
                </Form.Item>
                <div className='text-center '>
                    <button className='border bg-sky-300 text-white border-white px-5 py-2 rounded' type='submit' >Thêm</button>
                </div>
            </Form>
        </div>
    )
}
