import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quanLyPhongServices } from "../../../services/QuanLyPhongServices";
import { chiTietRapAction } from "./../../../redux/Actions/QuanLyRapChieuAction";
export default function DetailsCinema(props) {
  const dispatch = useDispatch();
  const { rapChieuEdit } = useSelector((state) => state.QuanLyRapChieuReducer);
  const [state, setState] = useState({ lstRoom: [] });
  useEffect(async () => {
    dispatch(chiTietRapAction(props.match.params.id));
    try {
      const resultRoom = await quanLyPhongServices.layPhongTheoIDCinema(
        props.match.params.id
      );
      if (resultRoom.status === 200) {
        await setState({
          ...state,
          lstRoom: resultRoom.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const adr = (link) => {
    return (
      <div
        id="map-container-google-1"
        class="z-depth-1-half map-container"
        style={{
          height: "500px",
        }}
      >
        <iframe
          src={link}
          frameborder="0"
          style={{
            border: "0",
            height: "100%",
            width: "100%",
          }}
          allowfullscreen
        ></iframe>
      </div>
    );
  };

  const renderMap = (rapChieuEdit) => {
    switch (rapChieuEdit.id) {
      case 1:
        return adr(
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.757025313847!2d105.7995676761801!3d21.002374688682544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5ac9beb0bd%3A0xc4069a08defd1deb!2sChung%20c%C6%B0%20Golden%20West!5e0!3m2!1svi!2s!4v1684310346651!5m2!1svi!2s"
        );
      case 2:
        return adr(
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.757025313847!2d105.7995676761801!3d21.002374688682544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5ac9beb0bd%3A0xc4069a08defd1deb!2sChung%20c%C6%B0%20Golden%20West!5e0!3m2!1svi!2s!4v1684310346651!5m2!1svi!2s"
        );
      default:
        return adr(
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.757025313847!2d105.7995676761801!3d21.002374688682544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5ac9beb0bd%3A0xc4069a08defd1deb!2sChung%20c%C6%B0%20Golden%20West!5e0!3m2!1svi!2s!4v1684310346651!5m2!1svi!2s"
        );
    }
  };
  console.log("rapChieuEdit", rapChieuEdit);
  return (
    <div className="py-20 px-28">
      <h3 className="text-center text-3xl">Thông Tin Rạp Chiếu</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <h4 className="text-3xl">{rapChieuEdit.name}</h4>
          <div className="text-base">
            <ul className="list-disc">
              <li>
                <span className="font-bold">Địa điểm: </span>
                {rapChieuEdit.address}
              </li>
              {renderMap(rapChieuEdit)}
              <li>
                <span className="font-bold">Email:</span> cskh@tixvn.com
              </li>
              <li className="font-bold">Danh Sách Phòng :</li>
              {state.lstRoom?.map((room, index) => {
                return (
                  <ul className="ml-4" key={index}>
                    <li>- {room.roomName}</li>
                  </ul>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl">Quy Định Giá Vé</h3>
            <div className="text-base leading-loose">
              <ul>
                <li>
                  – Giá vé trẻ em áp dụng cho trẻ em có chiều cao dưới 1,3m. Yêu
                  cầu trẻ em có mặt khi mua vé. Trẻ em dưới 0,7m sẽ được miễn
                  phí vé khi mua cùng 01 vé người lớn đi kèm theo. Không áp dụng
                  kèm với chương trình khuyến mãi ưu đãi về giá vé khác.
                </li>
                <li>
                  – Giá vé thành viên U22 chỉ áp dụng cho thành viên dưới 22
                  tuổi khi mua vé. Không áp dụng kèm với chương trình khuyến mãi
                  ưu đãi về giá vé khác. Mỗi thẻ thành viên U22 được áp dụng giá
                  vé ưu đãi tối đa 02 vé/ngày.
                </li>
                <li>
                  – Ngày lễ: 1/1, Giổ Tổ Hùng Vương 10/3 Âm Lịch, 30/4, 1/5,
                  2/9.
                </li>
                <li>– Giá vé Tết Âm Lịch sẽ được áp dụng riêng.</li>
                <li>
                  – Suất chiếu đặc biệt áp dụng giá vé theo khung giờ của ngày.
                  Không áp dụng các giá vé ưu đãi dành cho U22, Privilege
                  Voucher/Staff Voucher, Happy Day. Trong trường hợp Suất chiếu
                  đặc biệt cùng ngày với Happy Day sẽ áp dụng giá vé của Thứ 3
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
