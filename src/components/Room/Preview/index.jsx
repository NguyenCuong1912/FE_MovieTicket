import React, { Fragment } from "react";
import Seat from "../../Seat";
import { roomSize, sizeConst } from "../../../constants/roomSize";
import RoomSizeS from "../SizeS";
import RoomSizeM from "../SizeM";
import RoomSizeL from "../SizeL";
import RoomNoraml from "../Normal";

export default function RoomPreview(props) {
  const size = props.location.search.split("?")[1];
  const room = roomSize.find((item) => item.size === size);
  console.log(room);
  let lstGhe = [];
  for (let index = 1; index <= room.maxSeat; index++) {
    const ghe = { seatName: "" };
    lstGhe.push(ghe);
  }
  console.log(lstGhe);
  const renderSize = () => {
    if (size === "S") {
      return (
        <RoomSizeS
          seat_of_row={room.seat_of_row}
          lstGhe={lstGhe}
          className="disabled:opacity-75"
        />
      );
    }
    if (size === "M") {
      return (
        <RoomSizeM
          seat_of_row={room.seat_of_row}
          lstGhe={lstGhe}
          className="disabled:opacity-75"
        />
      );
    }
    if (size === "L") {
      return (
        <RoomSizeL
          seat_of_row={room.seat_of_row}
          lstGhe={lstGhe}
          className="disabled:opacity-75"
        />
      );
    }
    if (!sizeConst.includes(size)) {
      return (
        <RoomNoraml
          seat_of_row={room.seat_of_row}
          lstGhe={lstGhe}
          className="disabled:opacity-75"
        />
      );
    }
  };
  return (
    <div className="text-center">
      <h1 className="text-xl my-10">Room Size {size}</h1>
      <div className="flex justify-center ">{renderSize()}</div>
    </div>
  );
}
