import { useState, useEffect, useCallback } from "react";

let logOutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token, expirationDate = null) => {
    setUserId(userId);
    setToken(token);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logOutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId };
};
