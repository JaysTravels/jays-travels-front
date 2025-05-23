import { Button, Input } from "reactstrap";

const StickySidebarFa = () => {
  return (
    <div className="sticky-cls-top">
      <div className="review-section">
        <div className="review_box">
          <div className="title-top">
            <h5>travel addons</h5>
          </div>
          <div className="flight_detail">
            <div className="summery_box">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>flight fare</td>
                    <td>$2500</td>
                  </tr>
                  <tr className="title">
                    <td>additional baggage</td>
                  </tr>
                  <tr>
                    <td>additional 15kg</td>
                    <td>+ $25</td>
                  </tr>
                  <tr className="title">
                    <td>inflight meals</td>
                  </tr>
                  <tr>
                    <td>veg meal X (1)</td>
                    <td>+ $18</td>
                  </tr>
                  <tr>
                    <td>non-veg meal X (1)</td>
                    <td>+ $18</td>
                  </tr>
                  <tr className="title">
                    <td>seats</td>
                  </tr>
                  <tr>
                    <td>seat(10D)</td>
                    <td>+ $5</td>
                  </tr>
                </tbody>
              </table>
              <div className="grand_total">
                <h5>
                  grand total: <span>$2750</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-section">
        <div className="single-sidebar p-0">
          <div className="newsletter-sec">
            <div>
              <h4 className="title">always first</h4>
              <p>
                Be the first to find out latest tours and exclusive offers and
                get 15% off your first booking.
              </p>
              <form>
                <Input
                  type="email"
                  id="email1"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <div className="button">
                  <Button color="c6" className="rounded-0">
                    be the first
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickySidebarFa;
