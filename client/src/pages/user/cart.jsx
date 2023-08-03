import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";
import Header from "../../components/header";
import Maps from "../../assets/img/map.png";
import AyamCart from "../../assets/img/ayamcart.png";
import Trash from "../../assets/img/trash.png";
import ModalMaps from "../../components/modalMaps";
import { useState } from "react";

import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import ModalDelete from "../../components/modalDelete";

function Cart() {
  const [showMaps, setShowMaps] = useState(false);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/order/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  let { data: cart, refetch } = useQuery("orderCache", async () => {
    const response = await API.get("/order-user");
    console.log("ini respon transaction", response);
    return response.data.data;
  });

  const subTotal = cart?.reduce((acc, data) => acc + data?.product.price, 0);
  const total = subTotal + 35000;

  const handleBuy = useMutation(async (e) => {
    try {
      const formdata = new FormData();
      formdata.set("partner_id", cart[0]?.partner_id);
      formdata.set("total_price", total);

      const response = await API.post("/transaction", formdata);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/myprofile");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/myprofile");
        },
        onError: function (result) {
          console.log(result);
          navigate("/myprofile");
        },
        onClose: function () {
          alert("You closed the popup without finishing the payment!");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div>
      <Container>
        <h2 className="my-3 fw-bold">User Order</h2>
        <Form>
          <Row className="">
            <p>Delivery Location</p>
            <Form.Group as={Col} md={9}>
              <Form.Control
                type="text"
                name="location"
                placeholder="Location"
              />
              <p className="mt-3">Review Your Order</p>
            </Form.Group>

            <Form.Group as={Col}>
              <Button
                variant="dark"
                className="w-100"
                onClick={() => setShowMaps(true)}
                disabled
              >
                Select On Map{" "}
                <img src={Maps} className="align-top" alt="Brand" />
              </Button>
            </Form.Group>
          </Row>
        </Form>

        <div className="d-flex justify-content-center">
          <div className="w-75">
            {cart?.map((data, index) => (
              <Row
                className=" border-top  border-dark py-3"
                key={index}
              >
                <Col md={2} className="">
                  <img
                    src={data?.product.image}
                    style={{ width: "100px", height: "100px" }}
                    alt="ayam"
                  />
                </Col>
                <Col md={8} className="">
                  <p>{data?.product.title}</p>
                </Col>
                <Col md={2} className="">
                  <p className="text-danger">Rp. {data?.product.price}</p>
                  <img
                    src={Trash}
                    alt="trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  />
                </Col>
              </Row>
            ))}
          </div>

          <div className="ms-5 w-25">
            <div className="border-top border-bottom border-dark p-1">
              <Row>
                <Col>
                  <p>Subtotal</p>
                </Col>
                <Col>
                  <p className="text-danger">Rp. {subTotal}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Qty</p>
                </Col>
                <Col>
                  <p>{cart?.length}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Ongkir</p>
                </Col>
                <Col>
                  <p className="text-danger">Rp. 35000</p>
                </Col>
              </Row>
            </div>
            <Row className="pt-3">
              <Col>
                <p className="text-danger">Total</p>
              </Col>
              <Col>
                <p className="text-danger">Rp. {total}</p>
              </Col>
            </Row>
          </div>
        </div>

        <Button
          variant="dark"
          type=""
          className="w-25 mt-5"
          onClick={(e) => handleBuy.mutate(e)}
        >
          Buy
        </Button>
      </Container>

      <ModalMaps show={showMaps} showMaps={setShowMaps} />
      <ModalDelete
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Cart;
