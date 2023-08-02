import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/header";

import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  let navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
  });

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
      formData.set("title", form.title);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("price", form.price);

      const response = await API.post("/product", formData, config);
      console.log("Add Product Partner success :", response);

      navigate("/addproduct");
    } catch (error) {
      console.log("Add Product failed :", error);
    }
  });

  return (
    <div>
      <Container>
        <h2 className="mt-5">Add Product</h2>
        <Form className="my-5" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} md={10}>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="title"
                placeholder="Title"
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

          <Form.Group className="mb-5">
            <Form.Control
              type="number"
              onChange={handleChange}
              name="price"
              placeholder="Price"
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-25">
            Save
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddProduct;
