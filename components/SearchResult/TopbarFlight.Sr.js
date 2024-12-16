import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Slider from "react-slick";
import { Button } from "reactstrap";
import "slick-carousel/slick/slick.css";

const items = [
  {
    date: "oct 14",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 15",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 16",
    fare: "$250",
    active: "active",
  },
  {
    date: "oct 17",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 18",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 19",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 20",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 21",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 22",
    fare: "$250",
    active: "",
  },
  {
    date: "oct 23",
    fare: "$250",
    active: "",
  },
];

const TopbarFlightSr = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    className: "fare-6",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="top-bar-flight">
        <div className="date-fare-slider">
          {/* <div className="fare-6"> */}
          <Slider {...settings}>
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <Link href="javascript:void(0)">
                    <div className={`fare-box ${item.active}`}>
                      <h5 className="date">{item.date}</h5>
                      <h6 className="fare">{item.fare}</h6>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
          {/* </div> */}
        </div>
        <div className="fare-calender">
          <div>
            <i className="far fa-calendar-alt"></i>
            <h6 className="title">fare calender</h6>
          </div>
          <div className="calender-external">
            <div id="calendar"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopbarFlightSr;
