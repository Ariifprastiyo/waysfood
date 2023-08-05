import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Mapss from "../../assets/img/map.png";

import { useMutation, useQuery } from "react-query";
import { API, setAuthToken } from "../../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalMaps from "../../components/modalMaps";
import axios from "axios";

function Profile() {
  const [showMaps, setShowMaps] = useState(false);
  const [clickedPosition, setClickedPosition] = useState("");
  const [location, setLocation] = useState("");

  console.log("postion", clickedPosition);
  console.log("latitud", clickedPosition.lat);

  setAuthToken(localStorage.token);
  let navigate = useNavigate();

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
      if (clickedPosition) {
        formData.set("latitude", form.latitude);
        formData.set("longitude", form.longitude);
      }

      const response = await API.patch("/user", formData, config);

      alert("Update User Success");
      navigate("/myprofile");
    } catch (error) {
      console.log("ini error update :", error);
      alert("Update User Failed");
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
        <h2 className="mt-5 fw-bold">Edit Profile</h2>
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
                disabled
                hidden
                onChange={handleChange}
                value={clickedPosition ? clickedPosition.lat : form.latitude}
              />
              <Form.Control
                type="text"
                name="longitude"
                disabled
                hidden
                onChange={handleChange}
                value={clickedPosition ? clickedPosition.lng : form.longitude}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Button
                variant="dark"
                type="button"
                className="w-100"
                onClick={() => setShowMaps(true)}
              >
                Select On Map{" "}
                <img src={Mapss} className="align-top" alt="Brand" />
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

export default Profile;
