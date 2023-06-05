import React, { Fragment } from "react";
import Seat from "../../Seat";

export default function RoomNormal(props) {
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
        return (
          <Fragment key={ghe.id}>
            <Seat
              ghe={ghe}
              userLogin={userLogin}
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
