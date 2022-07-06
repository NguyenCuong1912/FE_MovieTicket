import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import QuanLyNguoiDungReducer from './Reducers/QuanLyNguoiDungReducer'
import QuanLyLoaiNguoiDungReducer from './Reducers/QuanLyLoaiNguoiDungReducer'
import QuanLyPhimReducer from './Reducers/QuanLyPhimReducer';
import QuanLyCumRapReducer from './Reducers/QuanLyCumRapReducer';
import QuanLyRapChieuReducer from './Reducers/QuanLyRapChieuReducer';
import QuanLyPhongReducer from './Reducers/QuanLyPhongReducer';
import QuanLyLichChieuReducer from './Reducers/QuanLyLichChieuReducer';
import QuanLySeatsReducer from './Reducers/QuanLySeatsReducer';
import QuanLyTicketReducer from './Reducers/QuanLyTicketReducer';
import ModalReducer from './Reducers/ModalReducer';
import LoadingReducer from './Reducers/LoadingReducer';

const rootReducers = combineReducers({
    QuanLyNguoiDungReducer,
    QuanLyLoaiNguoiDungReducer,
    QuanLyPhimReducer,
    QuanLyCumRapReducer,
    QuanLyRapChieuReducer,
    QuanLyPhongReducer,
    QuanLyLichChieuReducer,
    QuanLySeatsReducer,
    QuanLyTicketReducer,
    ModalReducer,
    LoadingReducer

});
export const store = createStore(rootReducers, applyMiddleware(thunk));
