import Image from "next/image";
import { Col, Container, Row } from "reactstrap";
import LeftSidebarSr from "@/components/SearchResult/LeftSidebar.Sr";
import RightContentSr from "@/components/SearchResult/RightContent.Sr";

const ContentSr = () => {
  return (
    <>
      <div className="pt-0 bg-inner small-section">
        <Container>
          <Row>
            <Col lg={3}>
              <LeftSidebarSr />
            </Col>
            <Col lg={9} className="ratio3_2">
              <RightContentSr />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ContentSr;
