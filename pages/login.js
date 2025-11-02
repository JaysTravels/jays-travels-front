// pages/login.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Label, Button, Form, FormGroup } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Meta from "@/components/common/Meta";
import FrontLayout from "@/components/layouts/Front.Layout";
import { getLoginDetails, setLogin } from "@/store/loginSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { status, login_Error, login_response } = useSelector(
    (state) => state.logindetails
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let temp = {};
    if (!formData.email) temp.email = "Email is required";
    if (!formData.password) temp.password = "Password is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Store form in Redux (optional)
    dispatch(setLogin({ email: formData.email, password: formData.password }));

    // Call async thunk for login
    dispatch(getLoginDetails({ email: formData.email, password: formData.password }));
  };

  useEffect(() => {
    if (status === "succeeded" && login_response) {
      debugger;
      // Example: Save token & redirect
       const encryptedUser = login_response;
      if (encryptedUser) {
        localStorage.setItem("userData", encryptedUser);
        console.log("Encrypted user data saved to localStorage");
      } else {
        console.warn("No encrypted data found in login response");
      }
      localStorage.setItem("userData", encryptedUser);
        window.location.reload()
        window.location.href = "/"; 
      
        //router.push("/");     
    }
  }, [status, login_response, router]);

  return (
    <>
      <Meta title="Login" />
      <div className="small-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <div className="review-section p-4 shadow rounded bg-white">
                <div className="review_box">
                  <div className="title-top mb-4">
                    <h4 className="text-center">Login to Your Account</h4>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    {login_Error && (
                      <div className="alert alert-danger text-center">
                        {login_Error}
                      </div>
                    )}

                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "is-invalid" : ""}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? "is-invalid" : ""}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </FormGroup>

                    <FormGroup check className="mb-3">
                      <Label check>
                        <Input
                          type="checkbox"
                          name="remember"
                          checked={formData.remember}
                          onChange={handleChange}
                        />{" "}
                        Remember me
                      </Label>
                    </FormGroup>

                    <div className="text-center">
                      <Button
                        type="submit"
                        color="primary"
                        className="btn btn-solid w-100"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Logging in..." : "Login"}
                      </Button>
                    </div>

                    <div className="text-center mt-3">
                      <a href="/forgot-password" className="text-primary">
                        Forgot password?
                      </a>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
};

export default Login;
