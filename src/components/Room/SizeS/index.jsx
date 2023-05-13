import React, { Fragment } from "react";
import Seat from "../../Seat";

export default function RoomSizeS(props) {
  const { lstGhe, userLogin, handleSocket, idShowtime, seat_of_row } = props;
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
          <Fragment key={index}>
            <Seat
              ghe={ghe}
              userLogin={userLogin}
              classGheDaDat={classGheDaDat}
              classGheBanDat={classGheBanDat}
              classGheDangDat={classGheDangDat}
              handleSocket={handleSocket}
              idShowtime={idShowtime}
            />

            {(index + 1) % seat_of_row === 0 ? <br /> : ""}
            {(index + 1) % 2 === 0 &&
            (index + 1) % 16 !== 0 &&
            (index + 1) % 8 !== 0 &&
            (index + 1) % 4 !== 0 &&
            !((index + 6) % 16 === 0 || (index + 10) % 16 === 0) &&
            !((index - 2) % 16 === 0 || (index + 2) % 16 === 0) &&
            (index + 1) % 16 !== 6 &&
            (index + 1) % 16 !== 10 &&
            (index + 1) % 16 !== 22 &&
            (index + 1) % 16 !== 26 ? (
              <Fragment>
                <span className="mr-10"></span>
              </Fragment>
            ) : (
              ""
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
