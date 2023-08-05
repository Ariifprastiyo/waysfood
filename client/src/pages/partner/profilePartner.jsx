import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/header";
import Maps from "../../assets/img/map.png";

import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalMaps from "../../components/modalMaps";
import axios from "axios";

function ProfilePartner() {
  let navigate = useNavigate();

  const [showMaps, setShowMaps] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [location, setLocation] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    image: "",
    email: "",
    phone: "",
    latitude: "",
    longitude: "",
  });

  async function getDataUpdate() {
    const responseProfile = await API.get("/profile");

    setForm({
      ...form,
      fullname: responseProfile.data.data.fullname,
      image: responseProfile.data.data.image,
      email: responseProfile.data.data.email,
      phone: responseProfile.data.data.phone,
      latitude: responseProfile.data.data.latitude,
      longitude: responseProfile.data.data.longitude,
    });
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

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      if (clickedPosition) {
        formData.set("latitude", latitude);
        formData.set("longitude", longitude);
      }

      const response = await API.patch("/user", formData);

      navigate("/myprofilepartner");
      alert("Update Profile Partner Success");
    } catch (error) {
      console.log("ini error update :", error);
      alert("Update Profile Partner Failed");
    }
  });

  const latitude = clickedPosition ? clickedPosition.lat : form?.latitude;
  const longitude = clickedPosition ? clickedPosition.lng : form?.longitude;

  useEffect(() => {
    // Fetch the address from LocationIQ when form.latitude or form.longitude changes
    if (latitude && longitude) {
      const api_key = "pk.ec3ec8e73ea41ccefedfd001e1e1ddab";
      const url = `https://us1.locationiq.com/v1/reverse.php?key=${api_key}&lat=${latitude}&lon=${longitude}&format=json`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          const address = data.display_name || "Address not found";
          setLocation(address);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return (
    <div>
      <Container>
        <h2 className="mt-5">Edit Profile Partner</h2>
        <Form className="my-5" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} md={10}>
              <Form.Control
                type="text"
                name="fullname"
                value={form?.fullname}
                onChange={handleChange}
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
            <Form.Control
              type="email"
              value={form?.email}
              onChange={handleChange}
              name="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              value={form?.phone}
              onChange={handleChange}
              name="phone"
              placeholder="Phone"
            />
          </Form.Group>

          <Row className="mb-5">
            <Form.Group as={Col} md={10}>
              <Form.Control
                type="text"
                value={location}
                placeholder="Location"
                disabled
              />
              <Form.Control
                type="text"
                name="latitude"
                hidden
                onChange={handleChange}
                value={clickedPosition ? clickedPosition.lat : form.latitude}
              />
              <Form.Control
                type="text"
                name="longitude"
                hidden
                onChange={handleChange}
                value={clickedPosition ? clickedPosition.lng : form.longitude}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Button
                variant="dark"
                type="button"
                className="w-100"
                onClick={() => setShowMaps(true)}
              >
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

      <ModalMaps
        show={showMaps}
        showMaps={setShowMaps}
        clickedPosition={clickedPosition}
        setClickedPosition={setClickedPosition}
      />
    </div>
  );
}

export default ProfilePartner;
