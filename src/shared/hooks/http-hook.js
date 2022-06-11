import { useState, useCallback, useEffect, useRef, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth-context";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const source = useRef(null);
  const { token } = useContext(AuthContext);

  const sendRequest = useCallback(
    async (method, url, body = null) => {
      setIsLoading(true);
      source.current = axios.CancelToken.source();

      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios(
          {
            method,
            url,
            data: body,
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          },
          {
            CancelToken: source.current.token,
          }
        );

        const data = response.data;

        setIsLoading(false);

        return data;
      } catch (err) {
        setIsLoading(false);

        if (axios.isCancel(err)) {
          // console.log(err);
          throw err;
        } else {
          // console.log(err);
          setError(
            err.response.data?.message ||
              "Something went wrong, please try again."
          );
          throw err;
        }
      }
    },
    [token]
  );

  const clearError = () => {
    setError(false);
  };

  useEffect(() => {
    return () => {
      if (source.current) {
        source.current.cancel();
      }
    };
  });

  return { isLoading, error, sendRequest, clearError };
};
