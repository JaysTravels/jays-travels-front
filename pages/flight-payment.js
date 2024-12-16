import Meta from "@/components/common/Meta";
import BreadcrumbSectionFp from "@/components/flightPayment/BreadcrumbSection.Fp";
import ReviewSectionFp from "@/components/flightPayment/ReviewSection.Fp";
import StickySidebarFp from "@/components/flightPayment/StickySidebar.Fp";
import FrontLayout from "@/components/layouts/Front.Layout";

import { Col, Container, Row } from "reactstrap";

const FlightPayment = () => {
  return (
    <>
      <Meta title="Flight payment" />

      <BreadcrumbSectionFp />

      <div className="small-section">
        <Container>
          <Row>
            <Col lg={8}>
              <ReviewSectionFp />
            </Col>
            <Col lg={4} className="res-margin">
              <StickySidebarFp />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FlightPayment;

FlightPayment.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
};
