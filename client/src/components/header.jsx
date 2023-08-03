import { Navbar, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "../assets/img/Icon.png";
import User from "../assets/img/user.png";
import Cart from "../assets/img/cart.png";
import AddProduct from "../assets/img/addproduct.png";
import Logout from "../assets/img/logout.png";
import ModalLogin from "./modalLogin";
import { useContext, useState } from "react";
import ModalRegister from "./modalRegister";
import { UserContext } from "../context/userContext";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <Navbar expand="lg" className="bg-warning">
        <Container>
          <Navbar.Brand href="#">
            <Link to="/">
              <img src={Icon} alt="Brand" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="justify-content-end gap-3"
          >
            <>
              {state.user.role === "partner" ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="warning">
                      <img
                        src={state.user.image}
                        className="rounded-circle object-fit-cover border rounded"
                        style={{ width: "50px", height: "50px" }}
                        alt=""
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link
                        to="/myprofilepartner"
                        style={{ textDecoration: "none" }}
                      >
                        <Dropdown.Item href="#/action-1" className="">
                          <img src={User} className="" alt="" /> Profile Partner
                        </Dropdown.Item>
                      </Link>

                      <Link to="/addproduct" style={{ textDecoration: "none" }}>
                        <Dropdown.Item href="#/action-1">
                          <img src={AddProduct} className="" alt="" /> Add
                          Product
                        </Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#" onClick={logout}>
                        <Link
                          to="/"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <img src={Logout} className="" alt="" /> Logout
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : state.isLogin ? (
                <>
                  <Link to="/cart">
                    <img src={Cart} className="" alt="" />
                  </Link>
                  <Dropdown>
                    <Dropdown.Toggle variant="warning">
                      <img
                        src={state.user.image}
                        className="rounded-circle object-fit-cover border rounded"
                        style={{ width: "50px", height: "50px" }}
                        alt=""
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Link to="/myprofile" style={{ textDecoration: "none" }}>
                        <Dropdown.Item href="#/action-1" className="fs-6">
                          <img src={User} className="" alt="" /> Profile
                        </Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#" onClick={logout}>
                        <Link
                          to="/"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <img src={Logout} className="" alt="" /> Logout
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button
                    variant="dark"
                    className="px-4"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </Button>
                  <Button
                    variant="dark"
                    className="px-4"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Button>
                </>
              )}
            </>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={showLogin}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />

      <ModalRegister
        show={showRegister}
        showRegister={setShowRegister}
        showLogin={setShowLogin}
      />
    </>
  );
}

export default Header;
