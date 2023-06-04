import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import { layDanhSachCumRapAction } from "../../../redux/Actions/QuanLyCumRapAction";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
export default function GroupCinemaClient(props) {
  const { lstGroupCinemas } = useSelector((state) => state.QuanLyCumRapReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachCumRapAction());
  }, []);
  const renderHeThongRap = () => {
    return lstGroupCinemas?.map((cumRap, index) => {
      return (
        <div key={index} className="xl:w-1/4 md:w-1/3 sm:w-1/2 p-4 ">
          <div
            className="bg-gray-100 py-2 px-3 rounded-lg cursor-pointer"
            onClick={() => {
              history.push(`SystemCinema/${cumRap.id}`);
            }}
          >
            <div
              style={{
                backgroundImage: `url(${DOMAIN_STATIC_FILE}${cumRap.logo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <img
                className="h-full opacity-0 rounded w-full object-cover object-center mb-2"
                src={`${DOMAIN_STATIC_FILE}${cumRap.logo}`}
                alt={cumRap.logo}
              />
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
              {cumRap.groupName}
            </h2>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">{renderHeThongRap()}</div>
        </div>
      </section>
    </div>
  );
}
