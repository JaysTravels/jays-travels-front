import Image from "next/image";
import flightBreadcrumb2 from "@/public/images/flights/flight-breadcrumb2.jpg";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const BreadcrumbSectionFc = () => {
  return (
    <div
      class="breadcrumb-section small-sec flight-sec pt-0"
      style={{ backgroundImage: "url(/images/flights/flight-breadcrumb2.jpg)" }}
    >
      <Image src={flightBreadcrumb2} class="bg-img img-fluid d-none" alt="" />
      <div class="content-bottom">
        <Container>
          <Row>
            <Col>
              <nav aria-label="breadcrumb" class="theme-breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link href="/search-result">flights</Link>
                  </li>
                  <li class="breadcrumb-item active">review</li>
                </ol>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BreadcrumbSectionFc;
