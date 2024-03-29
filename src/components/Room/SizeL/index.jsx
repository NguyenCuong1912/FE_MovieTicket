import React, { Fragment } from "react";
import Seat from "../../Seat";

export default function RoomSizeL(props) {
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
          <Fragment key={index}>
            <Seat
              ghe={ghe}
              userLogin={userLogin}
              handleSocket={handleSocket}
              idShowtime={idShowtime}
              className={className}
            />

            {(index + 1) % seat_of_row === 0 ? <br /> : ""}
            {(index + 3) % 4 === 0 &&
            !["8", "2", "0"].includes((index + 1).toString().slice(-1)) && // check if index is divisible by 4
            (index + 1) % 20 !== 0 ? ( // check if index is divisible by 20
              <Fragment>
                <span className="mr-7"></span>
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
