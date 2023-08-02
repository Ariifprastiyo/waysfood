import { Container, Row, Col } from "react-bootstrap";
import Pizza from "../assets/img/pizza.png";

function Jumbotron() {
  return (
    <div className="bg-warning py-4">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={7} className="">
            <h1 >Are You Hungry ?</h1>
            <h1 >Express Home Delivery</h1>
            <Row className="" > 
              <Col md={3}>
                <hr></hr>
              </Col>
              <Col md={9}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={5} className="">
            <img src={Pizza} className="mt-4" alt="Brand" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Jumbotron;
