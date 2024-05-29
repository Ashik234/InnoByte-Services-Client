import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import userRequest from "../utils/userRequest"; 

function OtpVerify({ email }) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(60);

  const otpMutation = useMutation({
    mutationFn: (data) => userRequest.post("/verify-otp", { ...data, email }),
    onSuccess: (data) => {
      localStorage.setItem("userJWT", data.data.token);
      toast.success(data.data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [seconds]);

  const onFinish = (formData) => {
    otpMutation.mutate({ ...formData, email });
  };

  return (
      <div className="bg-white lg:rounded-l-xl rounded-l-md border sm:w-1/2">
        <h1 className="p-4">Enter OTP</h1>
        <div className="lg:w-96 sm:w-80 mx-auto px-4">
          <Form onFinish={onFinish} className="flex flex-col">
            <Form.Item
              name="otp"
              rules={[
                { required: true, pattern: /^\d{6}$/, message: "Enter a valid OTP." },
              ]}
            >
              <Input size="large" placeholder="OTP" />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Verify OTP
            </Button>
            <Button
              disabled={seconds > 0}
              type="primary"
              htmlType="button"
              size="large"
              onClick={() => {
                setSeconds(60);
              }}
            >
              Re-send OTP {seconds > 0 ? `in ${seconds}s` : ""}
            </Button>
          </Form>
        </div>
      </div>
  );
}

export default OtpVerify;
