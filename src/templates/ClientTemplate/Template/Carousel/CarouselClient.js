import React, { useEffect } from 'react'
import './CarouselClient.css';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { layDanhSachPhimAction } from './../../../../redux/Actions/QuanLyPhimAction';
import { DOMAIN_STATIC_FILE } from '../../../../utils/Settings/config';
import { history } from '../../../../App';
export default function CarouselClient(props) {
    const dispatch = useDispatch()
    const { lstPhim } = useSelector(state => state.QuanLyPhimReducer)
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [])
    const contentStyle = {
        height: '625px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundPosition: 'center',
        // backgroundSize:'100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
    return (
        <div>
            <Carousel autoplay effect="fade" >
                {lstPhim.slice(0, 4)?.map((item, index) => {
                    return <div key={index}>
                        <div onClick={() => {
                            history.push(`/DetailsFilm/${item.id}`)
                        }} style={{ ...contentStyle, cursor: 'pointer', backgroundImage: `url(${DOMAIN_STATIC_FILE}${item.imgFilm})` }} key={index}>
                            <img className='w-full opacity-0' src={`${DOMAIN_STATIC_FILE}${item.imgFilm}`} alt={`${DOMAIN_STATIC_FILE}${item.imgFile}`} />
                        </div>
                    </div>
                })}
            </Carousel>
        </div>
    )
}
