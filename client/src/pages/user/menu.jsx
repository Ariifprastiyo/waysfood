import { Col, Container, Row, Card, Button } from "react-bootstrap";
import Header from "../../components/header";
import Ayam from "../../assets/img/ayam.png";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API, setAuthToken } from "../../config/api";
import { useState } from "react";

function Menu() {
  setAuthToken(localStorage.token);

  let navigate = useNavigate();
  let param = useParams();
  let id = parseInt(param.id);
  const [productId, setProductId] = useState();
  const [productUserId, setProductUserId] = useState();

  let { data: products } = useQuery(["productsCache", id], async () => {
    const response = await API.get("/products/" + id);
    console.log("ini response", response.data.data);
    return response.data.data;
  });

  const handleOrder = useMutation(async (formData) => {
    try {
      const response = await API.post("/order", formData);
      console.log("beli berhasil ", response);
      navigate("/product-partner/" + id);
      alert("Order Success");
    } catch (error) {
      console.log("beli gagal ", error);
    }
  });

  const handleOrderClick = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("partner_id", productUserId);
    formdata.set("product_id", productId);

    handleOrder.mutate(formdata);
  };

  return (
    <div>
      <Container>
        <h2 className="mt-5 fw-bold">Menus</h2>
        <Row className="row-cols-4 my-5">
          {products?.map((data, index) => (
            <Col key={index}>
              <Card className="p-2">
                <Card.Img
                  variant="top"
                  src={data?.image}
                  style={{ height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{data?.title}</Card.Title>
                  <Card.Text className="text-danger">
                    Rp. {data?.price}
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="text-center w-100"
                    onClick={(e) => {
                      setProductId(data?.id);
                      setProductUserId(data?.user?.id);
                      handleOrderClick(e);
                    }}
                  >
                    Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Menu;
