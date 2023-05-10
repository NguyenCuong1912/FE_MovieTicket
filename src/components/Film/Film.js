import { PlayCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { OPEN_MODAL_TRAILER } from '../../redux/Types/ModalType';
import { DOMAIN_STATIC_FILE } from '../../utils/Settings/config';
import './Film.css';

export default function Film(props) {
    const { phim } = props
    const dispatch = useDispatch();
    return (
        <div className='parent' style={{ height: '60vh', marginBottom: 40 }}>
            <div className="flex flex-col  h-full mx-2 p-2 rounded-md shadow-md ">
                <div
                    style={{
                        backgroundImage: `url(${DOMAIN_STATIC_FILE}${phim.imgFilm})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                        position: 'relative',
                    }}
                >
                    <img src={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
                        className="opacity-0 w-full" style={{ height: '40vh', }} alt={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
                    />
                    <div>
                        <button className='w-full playVideo ' style={{ top: 0, height: '40vh', position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className=' rounded-full cursor-pointer'>
                            </div>
                            <div onClick={() => {
                                dispatch({
                                    type: OPEN_MODAL_TRAILER,
                                    data: {
                                        trailer: phim.trailer,
                                        tenPhim: phim.nameFilm
                                    }
                                })
                            }} >
                                <PlayCircleOutlined style={{ fontSize: '50px', color: '#fff', opacity: 0.5 }} />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="mt-6 mb-2">
                    <h2 className="text-xl h-16 font-semibold tracking-wide">
                        {phim.nameFilm}
                    </h2>
                </div>
                <p className="moTa text-coolGray-800">
                    {_.truncate(phim.description, { 'length': 80, 'separator': '' })}
                </p>

            </div>
            <div onClick={
                () => {
                    history.push(`/DetailsFilm/${phim.id}`)
                }
            } className='child flex justify-center alignItems-center'>
                <button className="px-10 py-2 text-xl  rounded bg-red-500 text-white">
                    <NavLink className='text-white' activeStyle={{ color: "white" }} to={`/DetailsFilm/${phim.id}`} >Đặt vé</NavLink>
                </button>
            </div>
        </div>
    )
}
