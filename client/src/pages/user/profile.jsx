import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/header";
import Maps from "../../assets/img/map.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    image: "",
    email: "",
    phone: "",
    location: "",
  });

  async function getDataUpdate() {
    const responseProfile = await API.get("/profile");

    setForm({
      ...form,
      fullname: responseProfile.data.data.fullname,
      image: responseProfile.data.data.image,
      email: responseProfile.data.data.email,
      phone: responseProfile.data.data.phone,
      location: responseProfile.data.data.location,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getDataUpdate();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location);

      const response = await API.patch("/user", formData, config);

      navigate("/myprofile");
    } catch (error) {
      console.log("ini error update :", error);
    }
  });


  return (
    <div>
      <Container>
        <h2 className="mt-5">Edit Profile</h2>
        <Form className="my-5" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} md={10}>
              <Form.Control
                type="text"
                name="fullname"
                onChange={handleChange}
                value={form?.fullname}
                placeholder="Nama Partner"
              />
            </Form.Group>

            <Form.Group as={Col}>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <Form.Control onChange={handleChange} name="image" type="file" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Control type="email" value={form?.email} onChange={handleChange} name="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="number" value={form?.phone} onChange={handleChange} name="phone" placeholder="Phone" />
          </Form.Group>

          <Row className="mb-5">
            <Form.Group as={Col} md={10}>
              <Form.Control
                type="text"
                value={form?.location}
                onChange={handleChange}
                name="location"
                placeholder="Location"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Button variant="dark" type="submit" className="w-100">
                Select On Map{" "}
                <img src={Maps} className="align-top" alt="Brand" />
              </Button>
            </Form.Group>
          </Row>

          <Button variant="dark" type="submit" className="w-25">
            Save
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Profile;
