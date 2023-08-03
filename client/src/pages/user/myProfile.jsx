import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import Icon from "../../assets/img/Icon.png";

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
    console.log("ini respoh history", response);
    return response.data.data;
  });

  console.log("ini dat ", transaction);

  return (
    <div>
      <Container>
        <Row className="my-4">
          <Col>
            <h2 className="fw-bold">My Profile</h2>
          </Col>
          <Col>
            <h2 className="fw-bold">History Transaction</h2>
          </Col>
        </Row>

        <div className="d-flex justify-content-center">
          <div className="">
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
          <div className="p-4">
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

          <div className="ms-auto w-50">
            {transaction?.map((data, index) => (
              <Row key={index} className="pt-2 mb-2  bg-body-light rounded border">
                <Col md={8}>
                  <p className="fw-bold">{data?.partner.fullname}</p>
                  <p className="text-danger">Total : Rp {data?.total_price}</p>
                </Col>
                <Col>
                  <img src={Icon} alt="Brand" />
                  {data.status === "pending" && (
                    <div className="bg-warning text-center rounded mt-3 fw-bold">
                      <p>{data?.status}</p>
                    </div>
                  )}
                  {data.status === "success" && (
                    <div className="bg-success text-center rounded mt-3 fw-bold">
                      <p>{data?.status}</p>
                    </div>
                  )}
                </Col>
              </Row>
            ))}
          </div>
        </div>
        {/* 
        <Stack direction="horizontal" gap={3} className="mt-3">
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
        </Stack> */}

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
