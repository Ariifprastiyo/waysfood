import { Modal, Button, Form } from "react-bootstrap";

import { useMutation } from "react-query";
import { API } from "../config/api";
import { useState } from "react";

function ModalRegister({show, showRegister, showLogin}) {
    const handleClose = () => showRegister(false);
    const changeModal = () => {
        handleClose()
        showLogin(true)
    }

    const [form, setForm] = useState({
      email: '',
      password: '',
      fullname: '',
      gender: '',
      phone: '',
      role: '',
    })

    const { email, password, fullname, gender, phone, role } = form;

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();

        const response = await API.post('/register', form);
        console.log("register success", response)

        setForm({
          email: '',
          password: '',
          fullname: '',
          gender: '',
          phone: '',
          role: '',
        })
      } catch (error) {
        console.log("register failed", error)
      }
    })

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <h2 className="text-warning my-4">Register</h2>
          <Form.Group className="mb-3">
            <Form.Control type="email" value={email} onChange={handleChange} name="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" value={fullname} onChange={handleChange} name="fullname" placeholder="Full Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" value={gender} onChange={handleChange} name="gender" placeholder="Gender" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="number" value={phone} onChange={handleChange} name="phone" placeholder="Phone" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Select name="role" value={role} onChange={handleChange}>
              <option hidden>Open this select menu</option>
              <option value="user">As User</option>
              <option value="partner">As Partner</option>
            </Form.Select>
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100 mb-3" onClick={handleClose}>
            Register
          </Button>
          <p className="text-center">
            Already have an account ? Klik{" "}
            <b style={{ cursor: "pointer" }} onClick={changeModal}>Here</b>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalRegister;
