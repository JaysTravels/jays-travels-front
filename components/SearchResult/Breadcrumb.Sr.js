import Image from "next/image";
import flightBreadcrumb from "@/public/images/flight-breadcrumb.jpg";

const BreadcrumbSr = () => {
  return (
    <>
      <div
        className="breadcrumb-section flight-sec pt-0"
        style={{ backgroundImage: `url("/images/flight-breadcrumb.jpg")` }}
      >
        <Image
          src={flightBreadcrumb}
          className="bg-img img-fluid d-none"
          alt=""
        />
        <div className="flight run"></div>
      </div>
    </>
  );
};

export default BreadcrumbSr;
