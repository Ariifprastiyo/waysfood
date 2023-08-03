import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/header";
import Avatar from "../../assets/img/avatar.png";
import Icon from "../../assets/img/icon.png";

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/api";

function MyProfilePartner() {
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile");
    console.log("ini respon profile", response);
    return response.data.data;
  });

  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col>
            <h2 className="fw-bold">Profile Partner</h2>
          </Col>
        </Row>
        <Stack direction="horizontal" gap={3} className="mt-3">
          <div className="p-2">
            <img
              src={profile?.image}
              style={{ width: "300px", height: "300px" }}
              alt="Brand"
            />
            <div className="mt-4">
              <Link to="/profilepartner">
                <Button variant="dark" type="submit" className="w-100">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className="p-2" style={{ marginTop: "-110px" }}>
            <Row>
              <Col>
                <h4 className="fw-bold">Full Name</h4>
                <p>{profile?.fullname}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4 className="fw-bold">Email</h4>
                <p>{profile?.email}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4 className="fw-bold">Phone</h4>
                <p>{profile?.phone}</p>
              </Col>
            </Row>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default MyProfilePartner;
