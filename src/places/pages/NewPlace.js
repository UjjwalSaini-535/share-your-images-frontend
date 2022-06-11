import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./PlaceForm.css";

const NewPlace = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm({
    mode: "all",
  });

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const placeSubmitHandler = async (data) => {
    // console.log(data);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("image", data.image["0"]);
      // const response =
      await sendRequest(
        "post",
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        formData
      );

      // console.log(response);
      history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={handleSubmit(placeSubmitHandler)}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          register={register}
          requiredMsg="Please enter a valid title."
          errors={errors}
        />

        <Input
          id="description"
          element="textarea"
          label="Description"
          register={register}
          minLength="8"
          minLengthMsg="Please enter a valid description (at least 8 characters)."
          errors={errors}
        />

        <Input
          id="address"
          element="input"
          label="Address"
          register={register}
          requiredMsg="Please enter a valid address."
          errors={errors}
        />

        <ImageUpload
          center
          id="image"
          register={register}
          requiredMsg="Please pick an image."
          errors={errors}
        />

        <Button type="submit">ADD PLACE</Button>
      </form>
    </>
  );
};

export default NewPlace;
