import React, { Fragment } from "react";
import Seat from "../../Seat";

export default function RoomSizeM(props) {
  const {
    lstGhe,
    userLogin,
    handleSocket,
    idShowtime,
    seat_of_row,
    preSeat,
    currentSeat,
    nextSeat,
  } = props;
  const handleChoiceSeat = (preSeat, currentSeat, nextSeat) => {
    console.log("pre", preSeat);
    console.log("current", currentSeat);
    console.log("next", nextSeat);
  };
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
              // handleChoiceSeat={handleChoiceSeat}
              idShowtime={idShowtime}
              preSeat={lstGhe[index - 2]}
              currentSeat={ghe}
              nextSeat={lstGhe[index + 2]}
            />

            {(index + 1) % seat_of_row === 0 ? <br /> : ""}
            {(index + 1) % 4 === 0 &&
            (index + 1) % 16 !== 0 &&
            (index + 1) % 8 !== 0 ? (
              <Fragment>
                <span className="mr-8"></span>
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
