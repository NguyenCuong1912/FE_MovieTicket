import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyPhongServices } from '../../../services/QuanLyPhongServices';
import { chiTietRapAction } from './../../../redux/Actions/QuanLyRapChieuAction';
export default function DetailsCinema(props) {
    const dispatch = useDispatch();
    const { rapChieuEdit } = useSelector(state => state.QuanLyRapChieuReducer);
    const [state, setState] = useState({ lstRoom: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        dispatch(chiTietRapAction(props.match.params.id))
        try {
            const resultRoom = await quanLyPhongServices.layPhongTheoIDCinema(props.match.params.id);
            if (resultRoom.status === 200) {
                await setState({
                    ...state, lstRoom: resultRoom.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className='py-20 px-28'>
            <h3 className='text-center text-3xl'>Thông Tin Rạp Chiếu</h3>
            <div className='grid grid-cols-3 gap-2'>
                <div className='col-span-2'>
                    <h4 className='text-3xl'>{rapChieuEdit.name}</h4>
                    <div className='text-base'>
                        <ul className='list-disc'>
                            <li><span className='font-bold'>Địa điểm: </span>{rapChieuEdit.address}</li>
                            <li><span className='font-bold'>Email:</span> cskh@tixvn.com</li>
                            <li className='font-bold'>Danh Sách Phòng :</li>
                            {state.lstRoom?.map((room, index) => {
                                return <ul className='ml-4' key={index}>
                                    <li>- {room.roomName}</li>
                                </ul>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-2xl'>Quy Định Giá Vé</h3>
                        <div className='text-base leading-loose'>
                            <ul>
                                <li>– Giá vé trẻ em áp dụng cho trẻ em có chiều cao dưới 1,3m. Yêu cầu trẻ em có mặt khi mua vé. Trẻ em dưới 0,7m sẽ được miễn phí vé khi mua cùng 01 vé người lớn đi kèm theo. Không áp dụng kèm với chương trình khuyến mãi ưu đãi về giá vé khác.
                                </li>
                                <li>
                                    – Giá vé thành viên U22 chỉ áp dụng cho thành viên dưới 22 tuổi khi mua vé. Không áp dụng kèm với chương trình khuyến mãi ưu đãi về giá vé khác. Mỗi thẻ thành viên U22 được áp dụng giá vé ưu đãi tối đa 02 vé/ngày.
                                </li>
                                <li>– Ngày lễ: 1/1, Giổ Tổ Hùng Vương 10/3 Âm Lịch, 30/4, 1/5, 2/9.
                                </li>
                                <li>– Giá vé Tết Âm Lịch sẽ được áp dụng riêng.</li>
                                <li>– Suất chiếu đặc biệt áp dụng giá vé theo khung giờ của ngày. Không áp dụng các giá vé ưu đãi dành cho U22, Privilege Voucher/Staff Voucher, Happy Day. Trong trường hợp Suất chiếu đặc biệt cùng ngày với Happy Day sẽ áp dụng giá vé của Thứ 3</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div>
        </div>
    )
}
