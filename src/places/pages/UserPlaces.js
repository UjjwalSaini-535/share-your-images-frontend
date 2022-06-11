import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const data = await sendRequest(
          "get",
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );

        // console.log(data);
        setLoadedPlaces(data.data?.places || []);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchUserPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    // console.log(loadedPlaces, deletedPlaceId);
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place._id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} url="/" />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
