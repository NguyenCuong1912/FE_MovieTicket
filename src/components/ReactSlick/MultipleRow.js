import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Slider from "react-slick";
import { PHIM_DANG_CHIEU, PHIM_SAP_CHHIEU } from '../../redux/Types/QuanLyPhimType';
import Phim from "../Film/Film";
import styleSlick from './MultipleRow.module.css'
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        >
        </div>
    )
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: 'block', left: '-50px' }}
            onClick={onClick}
        >
        </div>
    )
}
export default function MultipleRow(props) {
    const dispatch = useDispatch();
    const [state, setState] = useState('dangChieu');
    useEffect(() => {
        dispatch({
            type: PHIM_DANG_CHIEU
        })
    }, [])

    const renderPhim = () => {
        return props.arrPhim.slice(0, 40).map((item, index) => {
            return <Phim key={index} phim={item} />
        })
    }
    const settings = {
        className: "center variable-width",
        infinite: false,
        centerPadding: "0px",
        slidesToShow: 4,
        speed: 600,
        rows: 1,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className="my-7">

            {state === 'dangChieu' ?
                <div className="ml-3 mb-3">
                    <button onClick={() => { }} className="bg-gray-700 p-2 text-white border border-white rounded mr-3">PHIM ĐANG CHIẾU</button>
                    <button onClick={async () => {
                        setState('sapChieu')
                        await dispatch({
                            type: PHIM_SAP_CHHIEU
                        })
                    }} className="bg-white p-2 text-gray-700 border border-gray-700 rounded mr-3">PHIM SẮP CHIẾU</button>
                </div> :
                <div className="ml-3 mb-3">
                    <button onClick={async () => {
                        await setState('dangChieu')
                        dispatch({
                            type: PHIM_DANG_CHIEU
                        })
                    }} className="bg-white p-2 text-gray-700 border border-gray-700 rounded mr-3">PHIM ĐANG CHIẾU</button>
                    <button className="bg-gray-700 p-2 text-white border border-white rounded mr-3">PHIM SẮP CHIẾU</button>
                </div>

            }
            <Slider {...settings}>
                {renderPhim()}
            </Slider>
        </div>
    );
}


