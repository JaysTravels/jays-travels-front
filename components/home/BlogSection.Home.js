import Image from "next/image";
import blog1 from "@/public/images/blog/1.jpg";
import blog2 from "@/public/images/blog/2.jpg";
import blog3 from "@/public/images/blog/3.jpg";
import blog4 from "@/public/images/blog/4.jpg";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    id: 1,
    img: blog1,
    day: "05",
    month: "nov",
    location: "phonics, newyork",
    title: "Twice profit than before you.",
    peragraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 2,
    img: blog2,
    day: "05",
    month: "nov",
    location: "phonics, newyork",
    title: "Twice profit than before you.",
    peragraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 3,
    img: blog3,
    day: "05",
    month: "nov",
    location: "phonics, newyork",
    title: "Twice profit than before you.",
    peragraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 4,
    img: blog4,
    day: "05",
    month: "nov",
    location: "phonics, newyork",
    title: "Twice profit than before you.",
    peragraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
];

const BlogSectionHome = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="blog_section section-b-space ratio_55">
      <div className="container">
        <div className="title-2">
          <h2>
            our news... <span>and blog</span>
          </h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum has
            been standard.......
          </p>
        </div>
        <div className="slide-3 no-arrow">
          <Slider {...settings}>
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <div className="blog-wrap">
                    <div className="blog-image">
                      <div
                        className="bg-size"
                        style={{
                          backgroundImage: `url(/images/blog/${item.id}.jpg)`,
                        }}
                      >
                        <Image
                          src={item.img}
                          className="img-fluid bg-img d-none"
                          alt=""
                        />
                      </div>
                      <div className="blog-label">
                        <div>
                          <h3>{item.day}</h3>
                          <h6>{item.month}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="blog-details">
                      <h6>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        {item.location}
                      </h6>
                      <a href="blog-detail-left-sidebar.html">
                        <h5>{item.title}</h5>
                      </a>
                      <p>{item.peragraph}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BlogSectionHome;
