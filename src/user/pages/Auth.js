import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
  });

  const switchModeHandler = () => {
    if (!isLoginMode) {
      reset({
        email: getValues("email"),
        password: getValues("password"),
      });
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (data) => {
    // console.log(data);
    if (isLoginMode) {
      try {
        const finalData = await sendRequest(
          "post",
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          data
        );

        // console.log(finalData);
        auth.login(finalData.data.user._id, finalData.token);
        //
      } catch (err) {
        // console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("name", data.name);
        formData.append("password", data.password);
        formData.append("passwordConfirm", data.passwordConfirm);
        formData.append("image", data.image["0"]);
        const finalData = await sendRequest(
          "post",
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          formData
        );

        // console.log(finalData);
        auth.login(finalData.data.user._id, finalData.token);
        //
      } catch (err) {
        // console.log(err);
      }
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={handleSubmit(authSubmitHandler)}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              register={register}
              requiredMsg="Please enter a name."
              errors={errors}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              register={register}
              requiredMsg="Please pick an image."
              errors={errors}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            register={register}
            validateEmail="Please enter a valid email address."
            errors={errors}
            get
            getValues={getValues}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            register={register}
            validatePassword="Please enter a valid password, password must contain at least eight characters, at least one number / special characters and both lower and uppercase letters."
            errors={errors}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="passwordConfirm"
              type="password"
              label="Password Confirm"
              register={register}
              validateConfirmPassword="Password dose not match."
              errors={errors}
              getValues={getValues}
            />
          )}

          <Button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
        </form>

        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
