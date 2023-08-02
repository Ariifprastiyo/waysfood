import { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";

function ModalLogin({ show, showLogin, showRegister }) {

  setAuthToken(localStorage.token);

  const handleClose = () => showLogin(false);
  const changeModal = () => {
    handleClose()
    showRegister(true)
  }

  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form);

      console.log("login success : ", response);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.role === "partner") {
        navigate("/income");
      } else {
        navigate("/");
      }

      setForm ({
        email: "",
        password: "",
      })
      
    } catch (error) {
      console.log("login failed : ", error);
    }
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <h2 className="text-warning my-4">Login</h2>
          <Form.Group className="mb-3">
            <Form.Control type="email" value={email} onChange={handleChange} name="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              value={password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100 mb-3" onClick={handleClose}>
            Login
          </Button>
          <p className="text-center">
            Don't have an account ? Klik{" "}
            <b style={{ cursor: "pointer" }} onClick={changeModal}>Here</b>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLogin;
