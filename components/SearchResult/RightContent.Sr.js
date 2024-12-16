import Image from "next/image";
import adjust from "@/public/images/icon/adjust.png";
import Link from "next/link";
import TopbarFlightSr from "@/components/SearchResult/TopbarFlight.Sr";
import FlightResultsSr from "@/components/SearchResult/FlightResults.Sr";

const RightContentSr = () => {
  return (
    <>
      <Link href="javascript:void(0)" className="mobile-filter border-top-0">
        <h5>latest filter</h5>
        <Image src={adjust} className="img-fluid" alt="" />
      </Link>

      <TopbarFlightSr />

      <FlightResultsSr />

      <nav
        aria-label="Page navigation example"
        className="pagination-section mt-0"
      >
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="javascript:void(0)"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="javascript:void(0)">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="javascript:void(0)">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="javascript:void(0)">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default RightContentSr;
