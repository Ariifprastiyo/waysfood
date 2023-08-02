import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/header";
import Avatar from "../../assets/img/avatar.png";
import Icon from "../../assets/img/icon.png";

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/api";

function MyProfile() {
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile");
    console.log("ini respon profile", response);
    return response.data.data;
  });

  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/buyer-transaction");
    console.log("ini respoh history", response)
    return response.data.data;
  });

  console.log("ini dat ", transaction)

  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col>
            <h2>My Profile</h2>
          </Col>
          <Col>
            <h2>History Transaction</h2>
          </Col>
        </Row>
        <Stack direction="horizontal" gap={3} className="border mt-3">
          <div className="p-2">
            <img
              src={profile?.image}
              style={{ width: "300px", height: "300px" }}
              alt="Brand"
            />
            <div className="mt-4">
              <Link to="/profile">
                <Button variant="dark" type="submit" className="w-100">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className="p-2 border">
            <Row>
              <Col>
                <h5>Full Name</h5>
                <p>{profile?.fullname}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Email</h5>
                <p>{profile?.email}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Phone</h5>
                <p>{profile?.phone}</p>
              </Col>
            </Row>
          </div>
          <div className="p-2 ms-auto border w-50">
            {transaction?.map((data, index) => (
              <Row key={index}>
                <Col md={8}>
                  <p className="fw-bold">{data?.partner.fullname}</p>
                  <p>Saturday, 12 March 2021</p>
                  <p className="text-danger">Total : Rp {data?.total_price}</p>
                </Col>
                <Col>
                  <img src={Icon} alt="Brand" />
                  <p>{data?.status}</p>
                </Col>
              </Row>
            ))}
          </div>
        </Stack>

        {/* <Stack direction="horizontal" className="border" gap={3}>
          <div className="p-2 border">
            <h2>My Profile</h2>
            <Row>
              <Col>
                <img src={Avatar} alt="Brand" />
              </Col>
              <Col>
                <h5>Full Name</h5>
                <p>Andi Saputra</p>
              </Col>
              <div>
                <Row>
                  <Col>
                    <h5>Email</h5>
                    <p>andi@gmail.com</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5>Phone</h5>
                    <p>082297978090</p>
                  </Col>
                </Row>
              </div>
            </Row>
          </div>
          <div className="p-2 ms-auto border">Second item</div>
        </Stack> */}
      </Container>
    </div>
  );
}

export default MyProfile;
