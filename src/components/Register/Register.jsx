import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registration, setRegistration] = useState(false);
  const navigateTo=useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    setRegistration(true);
    setTimeout(()=>{
      navigateTo("/")
    },1000)
  };

  const handleClearState = () => {
    setRegistration(false);
    reset();
  };

  const password = watch("password", "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="register-container">
      <div className="register">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {registration ? (
            <div className="registered">
              <div className="success">
                <p>Registered Successfully</p>
              </div>
              
            </div>
          ) : (
            <>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                {...register("name", {
                  required: "Name is required!",
                })}
              />
              {errors.name && <p className="err">{errors.name.message}</p>}

              <label>Email:</label>
              <input
                type="text"
                name="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" },
                })}
              />
              {errors.email && <p className="err">{errors.email.message}</p>}

              <label>Password:</label>
              <input
                type="password"
                className="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 10,
                    message: "Password must be at least 10 characters",
                  },
                  pattern: {
                    value: /[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\]/,
                    message:
                      "Password must contain at least one special character",
                  },
                })}
              />
              {errors.password && (
                <p className="err">{errors.password.message}</p>
              )}

              <label>Confirm Password:</label>
              <input
                type="password"
                className="password"
                autoComplete="new-password"
                {...register("repeatPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.repeatPassword && (
                <p className="err">{errors.repeatPassword.message}</p>
              )}

              <input type="submit" value="Register" />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
