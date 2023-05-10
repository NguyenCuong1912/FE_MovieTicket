import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { Button, Rate, Tabs } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../../../components/CircleRating/CircleRating.css';
import { lichChieuTheoHeThongRap } from '../../../redux/Actions/QuanLyLichChieuAction';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
import { layChiTietPhimAction } from './../../../redux/Actions/QuanLyPhimAction';
export default function DetailsFilm(props) {
    const dispatch = useDispatch();
    const { phimEdit } = useSelector(state => state.QuanLyPhimReducer);
    const { showTime } = useSelector(state => state.QuanLyLichChieuReducer)
    const id = props.match.params.id;
    useEffect(() => {
        dispatch(layChiTietPhimAction(id));
        dispatch(lichChieuTheoHeThongRap(id))
    }, [])
    const { TabPane } = Tabs;

    const renderContact = () => {
        return <view>
            <p>Bạn muốn nhắn nhủ gì tới chúng tôi ?</p>
        </view>
    }

    return (
        <div className='bg-cover bg-center' style={{ backgroundImage: `url(${DOMAIN_STATIC_FILE}${phimEdit.imgFilm})`, }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={15} // default blur value is 10px
                borderRadius={0}
            >
                <div className='grid grid-cols-12'>
                    <div className='col-span-5 col-start-3'>
                        <div className='grid grid-cols-3'>
                            <img style={{ width: '100%', height: 250, objectFit: 'cover' }} src={`${DOMAIN_STATIC_FILE}${phimEdit.imgFilm}`} alt={`${phimEdit.imgFilm}`} />
                            <div className='flex flex-col  justify-center ml-5 col-span-2'>
                                <p className='text-2xl font-bold'>{phimEdit.nameFilm}</p>
                                <p>{phimEdit.description}</p>
                                <p>{moment(phimEdit.showtime).format('DD-MM-YYYY hh:mm')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid col-start-10 col-span-4 '>
                        <div className={`c100 p${phimEdit?.rate * 10} big`} >
                            <span>{phimEdit?.rate}</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                            <div className='w-full text-center'>
                                <Rate allowHalf value={phimEdit?.rate / 2} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='bg-white  rounded py-10  mt-20'>
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane tab="Lịch chiếu" key="1">
                                <Tabs tabPosition='left'>
                                    {showTime?.map((rapChieu, index) => {
                                        return <TabPane className='my-3' key={index} tab={
                                            <div >
                                                <img style={{ width: 50, height: 50, objectFit: 'cover' }} src={`${DOMAIN_STATIC_FILE}${rapChieu.logo}`} alt={rapChieu.logo} />
                                            </div>
                                        }
                                        >
                                            <Tabs tabPosition='left'>
                                                {rapChieu.listRap?.map((rap, index) => {
                                                    return <TabPane key={index} tab={
                                                        <div style={{ width: 300 }} className='flex flex-wrap'>
                                                            <img style={{ width: 60, height: 60 }} src={`${DOMAIN_STATIC_FILE}${rap.logo}`} alt={`${rap.logo}`} />
                                                            <div className='text-black text-left ml-3'>
                                                                <p>{_.truncate(rap.name, {
                                                                    length: 30,
                                                                    separator: '.'
                                                                })}</p>
                                                                <p>{_.truncate(rap.address, {
                                                                    length: 30,
                                                                    separator: '.'
                                                                })}</p>
                                                            </div>
                                                        </div>
                                                    }>
                                                        {_.head(rap.listFilm)?.lstShowDate?.map((lichChieu, index) => {
                                                            return <Button className='mx-3 border rounded px-3 py-2' key={index}>
                                                                <NavLink to={`/checkout/${lichChieu.id}`}>
                                                                    {moment(lichChieu.showDate).format("hh:mm A")}
                                                                </NavLink>
                                                            </Button>
                                                        })
                                                        }
                                                    </TabPane>
                                                })}
                                            </Tabs>
                                        </TabPane>
                                    })}

                                </Tabs>
                            </TabPane>
                            <TabPane tab="Chi tiết" key="2">
                                Chi tiết
                            </TabPane>
                            <TabPane tab="Liên hệ" key="3">
                                {
                                    renderContact()
                                }
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
            </CustomCard>
        </div>
    )
}
