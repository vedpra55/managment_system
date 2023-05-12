import { useAuthState } from "@/context/authContext";
import axios from "axios";
import { removeCookies } from "cookies-next";
import { toast } from "react-hot-toast";

const useAuth = () => {
  const SIGN_URL = "/api/auth/signin";

  const { setAuthState } = useAuthState();

  async function signin(email, password) {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await axios.post(SIGN_URL, { email, password });
      console.log(response);
      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });

      toast.success("Loged In Sucessfully");
    } catch (err) {
      console.log(err);
      setAuthState({
        data: null,
        loading: false,
        error: err.response.data.errorMessage,
      });

      toast.error(err.response.data.errorMessage);
    }
  }

  async function logout() {
    removeCookies("jwt");

    setAuthState({
      data: null,
      loading: false,
      error: null,
    });
  }

  return {
    signin,
    logout,
  };
};

export default useAuth;
