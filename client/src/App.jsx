import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
import MyProfile from "./pages/user/myProfile";
import MyProfilePartner from "./pages/partner/myProfilePartner";
import AddProduct from "./pages/partner/addProduct";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, useNavigate } from "react-router-dom";

import { UserContext } from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import { API, setAuthToken } from "./config/api";
import Income from "./pages/partner/income";
import Menu from "./pages/user/menu";
import ProfilePartner from "./pages/partner/profilePartner";
import Profile from "./pages/user/profile";
import Cart from "./pages/user/cart";
import PrivatRoute from "./privateroute/privateRoute";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
    // eslint-disable-next-line
  }, [isLoading]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("check user success : ", response);
      // get user data
      let payload = response.data.data;
      // get token from local storage
      payload.token = localStorage.token;
      // send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route exact path="/" element={<PrivatRoute />}>
            <Route path="/income" element={<Income />}></Route>
            <Route path="/addproduct" element={<AddProduct />}></Route>
            <Route
              path="/myprofilepartner"
              element={<MyProfilePartner />}
            ></Route>
            <Route path="/profilepartner" element={<ProfilePartner />}></Route>
          </Route>
          
          <Route path="/product-partner/:id" element={<Menu />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
