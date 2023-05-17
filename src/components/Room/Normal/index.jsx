import React, { Fragment } from "react";
import Seat from "../../Seat";

export default function RoomNoraml(props) {
  const {
    lstGhe,
    userLogin,
    handleSocket,
    idShowtime,
    seat_of_row,
    className,
  } = props;
  return (
    <div>
      {lstGhe?.map((ghe, index) => {
        let classGheDaDat = ghe.bookded ? "gheDaDat" : "";
        let classGheBanDat = "";
        let classGheDangDat = "";
        //! seat you booked
        ghe.idUser === userLogin?.id
          ? (classGheBanDat = "gheBanDat")
          : (classGheBanDat = "");
        //! keepSeat
        if (!!ghe.keepSeat) {
          classGheDangDat =
            parseInt(ghe.keepSeat) === userLogin.id
              ? "gheBanDangDat"
              : "gheNguoiKhacDat";
        }
        return (
          <Fragment key={ghe.id}>
            <Seat
              ghe={ghe}
              userLogin={userLogin}
              classGheDaDat={classGheDaDat}
              classGheBanDat={classGheBanDat}
              classGheDangDat={classGheDangDat}
              handleSocket={handleSocket}
              idShowtime={idShowtime}
              className={className}
            />

            {(index + 1) % seat_of_row === 0 ? <br /> : ""}
          </Fragment>
        );
      })}
    </div>
  );
}
