import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Film from '../../../components/Film/Film';
import { layDanhSachPhimAction } from '../../../redux/Actions/QuanLyPhimAction';
export default function FilmClient(props) {
    const { lstPhim } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch();
    console.log(lstPhim)
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [])
    const renderFilm = () => {
        return lstPhim?.map((film, index) => {
            return <div className='grid grid-cols-3' >
                <Film key={index} phim={film} />
            </div>
        })
    }
    return (
        <div >
            {renderFilm()}
        </div>
    )
}
