import { Tabs } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
const { TabPane } = Tabs;
function HomeMenu(props) {
  const { lichChieu, lstPhim } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    tabPosition: "left",
  });
  return (
    <>
      <Tabs
        style={{
          margin: 10,
        }}
        className="border rounded mx-2"
        tabPosition={state.tabPosition}
      >
        {lichChieu?.map((item, index) => {
          return (
            <TabPane
              tab={
                <div
                  style={{
                    height: "10vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ objectFit: "fill" }}
                    className="w-10 rounded-full"
                    src={`${DOMAIN_STATIC_FILE}${item.logo}`}
                    alt={`${DOMAIN_STATIC_FILE}${item.logo}`}
                  />
                </div>
              }
              key={index}
            >
              {
                <Tabs tabPosition={state.tabPosition}>
                  {item.listRap?.map((rap, index) => {
                    return (
                      <TabPane
                        key={index}
                        tab={
                          <div
                            style={{
                              border: "1px solid #ebebec",
                              borderRadius: 5,
                              paddingRight: 10,
                              width: "50vh",
                            }}
                            className="flex w-25 pb-2 border-b"
                          >
                            <div
                              style={{
                                margin: 10,
                              }}
                              className="h-16 w-16 "
                            >
                              <img
                                st
                                yle={{ objectFit: "fill", borderRadius: 5 }}
                                className="w-full h-full"
                                src={`${DOMAIN_STATIC_FILE}${rap.logo}`}
                                alt={`${DOMAIN_STATIC_FILE}${rap.logo}`}
                              />
                            </div>
                            <div className="flex flex-col items-start flex-wrap ml-2 my-4 ">
                              <p className="text-base m-0 text-green-500">
                                {_.truncate(rap.name, {
                                  length: 25,
                                  separator: ".",
                                })}
                              </p>
                              <p className="text-sm m-0 text-gray-400">
                                {_.truncate(rap.address, {
                                  length: 55,
                                  separator: ".",
                                })}
                              </p>
                            </div>
                          </div>
                        }
                      >
                        {rap.listFilm?.map((phim, index) => {
                          return (
                            <div
                              style={{
                                margin: 10,
                              }}
                              key={index}
                              className=" pb-2 mb-2 border-b"
                            >
                              <div className="flex ml-6">
                                <img
                                  onClick={() => {
                                    history.push(`/DetailsFilm/${phim.idFilm}`);
                                  }}
                                  style={{
                                    objectFit: "fill",
                                    height: "20vh",
                                    width: "15vh",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    border: "1px solid #ebebec",
                                  }}
                                  lassName="w-20 h-20 cursor-pointer"
                                  src={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
                                  alt={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
                                />
                                <div
                                  onClick={() => {
                                    history.push(`/DetailsFilm/${phim.idFilm}`);
                                  }}
                                  style={{ cursor: "pointer" }}
                                  className="mt-2 ml-6"
                                >
                                  <p className="text-lg font-medium text-black">
                                    {phim.nameFilm}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-wrap">
                                {phim.lstShowDate?.map((time, index) => {
                                  return (
                                    <NavLink
                                      className=" m-5 ml-6 mr-3"
                                      to={`${`/checkout/${time.id}`}`}
                                    >
                                      <button
                                        className="rounded py-0.5 px-4 border"
                                        key={index}
                                      >
                                        {moment(time.showDate).format(
                                          "hh:mm A"
                                        )}
                                        <p className="m-0 text-xs">
                                          {moment(time.showDate).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </p>
                                      </button>
                                    </NavLink>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              }
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
}
export default memo(HomeMenu);
