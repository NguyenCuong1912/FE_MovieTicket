import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment'
import { capNhatPhimAction, layChiTietPhimAction } from '../../../../redux/Actions/QuanLyPhimAction';
import { DOMAIN_STATIC_FILE } from '../../../../utils/Settings/config';
export default function FilmEdit(props) {
    const { phimEdit } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const { id } = props.match.params;
        dispatch(layChiTietPhimAction(id))
    }, [])
    const [srcImg, setSrcImg] = useState('');
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nameFilm: phimEdit.nameFilm,
            trailer: phimEdit.trailer,
            description: phimEdit.description,
            showtime: phimEdit.showtime,
            nowShowing: phimEdit.nowShowing,
            comingSoon: phimEdit.comingSoon,
            rate: phimEdit.rate,
            imgFilm: null,
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (var key in values) {
                if (key !== 'imgFilm') {
                    formData.append(key, values[key]);
                } else {
                    if (values[key] !== null)
                        formData.append('films', values.imgFilm, values.imgFilm.name)
                }
            }
            dispatch(capNhatPhimAction(props.match.params.id, formData));
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
    const handleFile = async (e) => {
        // lấy file từ event
        const file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            // tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setSrcImg(e.target.result)
            }
            await formik.setFieldValue('imgFilm', file)
        }

    }
    return (
        <div>
            <h2 className='text-center my-4 text-2xl'>Cập Nhật Phim</h2>
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
                    <Input name='nameFilm' value={formik.values.nameFilm} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <Input name='description' value={formik.values.description} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' value={formik.values.trailer} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Đánh Giá">
                    <InputNumber name='rate' value={formik.values.rate} min='1' max='10' onChange={handleNumberAndSwitch('rate')} />
                </Form.Item>
                <Form.Item label="Ngày Chiếu">
                    <DatePicker value={moment(formik.values.showtime)} format='DD-MM-YYYY' onChange={handleDate} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name='comingSoon' checked={formik.values.comingSoon} onChange={handleNumberAndSwitch('comingSoon')} />
                </Form.Item>
                <Form.Item label="Đang Chiếu" valuePropName="checked">
                    <Switch name='nowShowing' checked={formik.values.nowShowing} onChange={handleNumberAndSwitch('nowShowing')} />
                </Form.Item>
                <Form.Item label="Ảnh">
                    <input type='file' name='imgFilm' onChange={handleFile} accept=".jpg, .jpeg, .png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={srcImg === '' ? `${DOMAIN_STATIC_FILE}${phimEdit?.imgFilm}` : srcImg} alt={`${srcImg}...`} />
                </Form.Item>
                <div className='text-center '>
                    <button className='border bg-sky-300 text-white border-white px-5 py-2 rounded' type='submit' >Cập nhật</button>
                </div>
            </Form>
        </div>
    )
}
