import Meta from "@/components/common/Meta";
import BreadcrumbSectionFa from "@/components/flightAddons/BreadcrumbSection.Fa";
import ReviewSectionFa from "@/components/flightAddons/ReviewSection.Fa";
import StickySidebarFa from "@/components/flightAddons/StickySidebar.Fa";
import FrontLayout from "@/components/layouts/Front.Layout";
import { Button, Col, Container, Row } from "reactstrap";

const FlightAddons = () => {
  return (
    <>
      <Meta title="Flight addons" />
      <BreadcrumbSectionFa />

      <div className="small-section">
        <Container>
          <Row>
            <Col lg={8}>
              <ReviewSectionFa />
            </Col>
            <Col lg={4} className="res-margin">
              <StickySidebarFa />
            </Col>
          </Row>
          <div className="continue-btn">
            <Button
              color="c6"
              size="sm"
              className="text-uppercase rounded-0"
              onclick="window.location.href='flight-booking-payment.html'"
            >
              make payment
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FlightAddons;

FlightAddons.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
};
