import { Button, Col, Container, Row } from "reactstrap";

const OffersHome = () => {
  return (
    <>
      <div className="offersHome zigZagEffect">
        <div className="cloud pyLg100 py50 px-1">
          <Container>
            <Row>
              <Col lg={4}>
                <div className="ohBox">
                  <h6>rica airlines</h6>
                  <h2>student offer</h2>
                  <h5>enjoy extra baggage allowance</h5>

                  <Button color="c3" size="sm">
                    read more
                  </Button>
                </div>
              </Col>
              <Col lg={4}>
                <div className="ohBox">
                  <h6>airlines</h6>
                  <h2>10% bonus</h2>
                  <h5>enjoy extra baggage allowance</h5>

                  <Button color="c3" size="sm">
                    read more
                  </Button>
                </div>
              </Col>
              <Col lg={4}>
                <div className="ohBox">
                  <h6>rica airlines</h6>
                  <h2>New offer</h2>
                  <h5>enjoy extra baggage allowance</h5>

                  <Button color="c3" size="sm">
                    read more
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default OffersHome;
