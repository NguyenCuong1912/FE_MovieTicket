import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { quanLyRapChieuServices } from '../../../services/QuanLyRapChieuServices';
import { DOMAIN_STATIC_FILE } from '../../../utils/Settings/config';
import { history } from './../../../App';
export default function SystemCinema(props) {
    const dispatch = useDispatch();
    const [state, setState] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try {
            const result = await quanLyRapChieuServices.layRapChieuTheoMaCumRap(props.match.params.id);
            if (result.status === 200) {
                await setState(
                    result.data
                )
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className='px-20 py-20'>
            <h2 className='text-center text-3xl'>Hệ Thống Rạp</h2>
            <div className='grid grid-cols-4 gap-2'>
                {state?.map((cinema, index) => {
                    return <div key={index} onClick={() => {
                        history.push(`/DetailsCinema/${cinema.id}`)
                    }}>
                        <div className='w-64 h-64' style={{ backgroundImage: `url(${DOMAIN_STATIC_FILE}${cinema.logo})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <img className='opacity-0 w-full h-full' src={`${DOMAIN_STATIC_FILE}public/images/group_cinemas/1646208912119_cgv.png`} alt='123' />
                        </div>
                        <h3 className='ml-3 py-3 text-base'>{cinema.name}</h3>
                    </div>
                })}

            </div>
        </div>
    )
}
