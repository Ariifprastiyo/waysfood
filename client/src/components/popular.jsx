import { Col, Container, Row } from "react-bootstrap";

import Burger from "../assets/img/burger.png";
import Starbucks from "../assets/img/starbucks.png";
import Kfc from "../assets/img/kfc.png";
import Jco from "../assets/img/jco.png";

function Popular() {
  return (
    <div>
      <Container>
        <h3 className="my-5">Popular Restaurant</h3>
        <Row className="my-5">
          <Col>
            <div className="bg-body-secondary rounded p-2">
              <img src={Burger} alt="burger" /> Burger King
            </div>
          </Col>
          <Col>
            <div className="bg-body-secondary rounded p-2">
              <img src={Starbucks} alt="starbucks" /> Starbucks
            </div>
          </Col>
          <Col>
            <div className="bg-body-secondary rounded p-2">
              <img src={Kfc} alt="kfc" /> KFC
            </div>
          </Col>
          <Col>
            <div className="bg-body-secondary rounded p-2">
              <img src={Jco} alt="jco" /> Jco
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Popular;
