import React, { useEffect } from "react";
import "./CarouselClient.css";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DOMAIN_STATIC_FILE } from "../../../../utils/Settings/config";
import { GetBannerAction } from "../../../../redux/Actions/BannerAction";
export default function CarouselClient(props) {
  const dispatch = useDispatch();
  const { lstBanner } = useSelector((state) => state.BannerReducer);
  const listBanenrActive = lstBanner?.filter((item) => item.isActive === true);
  useEffect(() => {
    dispatch(GetBannerAction());
  }, []);
  const contentStyle = {
    height: "625px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: "center",
    // backgroundSize:'100%',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div>
      <Carousel autoplay effect="fade">
        {listBanenrActive?.map((item, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  ...contentStyle,
                  cursor: "pointer",
                  backgroundImage: `url(${DOMAIN_STATIC_FILE}${item.image})`,
                }}
                key={index}
              >
                <img
                  className="w-full opacity-0"
                  src={`${DOMAIN_STATIC_FILE}${item.image}`}
                  alt={`${DOMAIN_STATIC_FILE}${item.image}`}
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
