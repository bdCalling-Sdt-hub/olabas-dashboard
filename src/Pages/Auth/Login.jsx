import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/apiSlices/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [logIn, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      const res = await logIn({
        email: email.trim(),
        password: password.trim(),
      }).unwrap();
      if (res.success) {
        localStorage.setItem("accessToken", res.data);
        // Force a full page reload to ensure all state is cleared
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login Error:", err);
      message.error(err?.data?.message || err?.message || "Login failed");
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label={
            <p className="text-black font-normal text-base">Enter Your Email</p>
          }
          rules={[{ required: true, message: "Please Enter your email" }]}
        >
          <Input
            placeholder="Enter Your email"
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<p className="text-black font-normal text-base">Password</p>}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a
            className="login-form-forgot text-smart/80 hover:text-smart font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            style={{
              width: "100%",
              height: 47,
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
            }}
            className="flex items-center justify-center bg-smart hover:bg-smart/90 rounded-lg text-base"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
