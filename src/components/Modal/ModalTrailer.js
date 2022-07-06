import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player/lazy'
import { CLOSE_MODAL_TRAILER } from '../../redux/Types/ModalType';
export default function ModalTrailer(props) {
    const dispatch = useDispatch();
    const { changeActive, phim } = useSelector(state => state.ModalReducer)
    const [isModalVisible, setIsModalVisible] = useState(changeActive);
    useEffect(() => {
        setIsModalVisible(changeActive)
    }, [changeActive])
    const handleOk = async () => {
        dispatch({
            type: CLOSE_MODAL_TRAILER,
        })
    };
    const handleCancel = () => {
        dispatch({
            type: CLOSE_MODAL_TRAILER,
        })
    };
    return (
        <>
            <Modal footer={null} width='700px' title={`TRAILER ${phim?.tenPhim}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <ReactPlayer controls stopOnUnmount={false} pip width='100%' height='300px' url={phim?.trailer} />
            </Modal>
        </>
    )
}
