import { Container, Row, Col, Card } from "react-bootstrap";
import Ayam from "../assets/img/ayam.png";

import { useQuery } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import ModalLogin from "./modalLogin";
import ModalRegister from "./modalRegister";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

function Restaurant() {
  const [state, dispatch] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  let { data: partner } = useQuery("partnerCache", async () => {
    const response = await API.get("/partner");
    return response.data.data;
  });

  let navigate = useNavigate();

  const productPartner = (id) => {
    navigate("/product-partner/" + id);
  };

  return (
    <div>
      <Container>
        <h3 className="mt-5">Restaurant Near You</h3>
        <Row className="row-cols-4 my-5">
          {partner?.map((data, index) => (
            <Col key={index}>
              <Card
                className="p-2"
                style={{ cursor: "pointer", height:"300px" }}
                onClick={() =>
                  !state.isLogin ? setShowLogin(true) : productPartner(data.id)
                }
              >
                <Card.Img variant="top" src={data.image} style={{height:"200px"}} />
                <Card.Body>
                  <Card.Title>{data.fullname}</Card.Title>
                  <Card.Text>0,2 KM</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <ModalLogin
        show={showLogin}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />
      <ModalRegister
        show={showRegister}
        showRegister={setShowRegister}
        showLogin={setShowLogin}
      />
    </div>
  );
}

export default Restaurant;
