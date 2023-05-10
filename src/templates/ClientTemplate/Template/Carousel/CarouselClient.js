import React, { useEffect } from 'react'
import './CarouselClient.css';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { layDanhSachPhimAction } from '../../../../redux/Actions/QuanLyPhimAction';
import { DOMAIN_STATIC_FILE } from '../../../../utils/Settings/config';
import { history } from '../../../../App';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
export default function CarouselClient(props) {
    const dispatch = useDispatch()
    const { lstPhim } = useSelector(state => state.QuanLyPhimReducer)
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [])
    return (
        <div>
            <Carousel autoplay effect="fade" >
                {lstPhim.slice(0, 4)?.map((item, index) => {
                    return <div
                        key={index}>

                        <div
                            className='bg-cover bg-center'
                            style={{
                                backgroundImage: `url(${DOMAIN_STATIC_FILE}${item.imgFilm})`,
                                height: '60vh',
                            }}
                            onClick={() => {
                                history.push(`/DetailsFilm/${item.id}`)
                            }} key={index}>
                            <CustomCard
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '60vh',
                                    width: '100%'
                                }}
                                effectColor="#fff" // required
                                color="#fff" // default color is white
                                blur={15} // default blur value is 10px
                                borderRadius={0}
                            >
                                <img style={{ opacity: 1, objectFit: 'cover', height: '50vh' }} src={`${DOMAIN_STATIC_FILE}${item.imgFilm}`} alt={`${DOMAIN_STATIC_FILE}${item.imgFilm}`} />
                            </CustomCard>
                        </div>
                    </div>
                })}
            </Carousel>
        </div>
    )
}
