import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";

const AuthenticationConext = createContext();

export default function AuthContext({ children }) {
  const [authState, setAuthState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  async function fetchUser() {
    const ME_URL = "/api/auth/verifyToken";
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });

    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        return setAuthState({
          data: null,
          loading: false,
          error: null,
        });
      }

      const response = await axios.get(ME_URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      setAuthState({
        data: null,
        loading: false,
        error: err.response.data.errorMessage,
      });

      toast.error(err.response.data.errorMessage);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationConext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationConext.Provider>
  );
}

export const useAuthState = () => useContext(AuthenticationConext);
