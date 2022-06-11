import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const { placeId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState(null);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const identifiedPlaces = await sendRequest(
          "get",
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );

        // const data = identifiedPlaces.data.place;
        // console.log(data);
        setLoadedPlaces(identifiedPlaces.data.place);
      } catch (error) {}
    };

    if (!loadedPlaces) {
      fetchData();
    }

    setValue("title", loadedPlaces?.title);
    setValue("description", loadedPlaces?.description);
  }, [sendRequest, placeId, setValue, loadedPlaces]);

  const placeUpdateSubmitHandler = async (data) => {
    try {
      // const responseData =
      await sendRequest(
        "patch",
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        data
      );
      // console.log(responseData);
      history.push("/" + auth.userId + "/places");
    } catch (error) {
      // console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlaces && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form
        className="place-form"
        onSubmit={handleSubmit(placeUpdateSubmitHandler)}
      >
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          register={register}
          getValues={getValues}
          requiredMsg="Please enter a valid title."
          errors={errors}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          register={register}
          minLength="8"
          minLengthMsg="Please enter a valid description (min. 8 characters)."
          errors={errors}
        />
        <Button type="submit">UPDATE PLACE</Button>
      </form>
    </>
  );
};

export default UpdatePlace;
