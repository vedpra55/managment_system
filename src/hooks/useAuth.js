import { useAuthState } from "@/context/authContext";
import axios from "axios";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const useAuth = () => {
  const SIGN_URL = "/api/auth/signin";

  const { setAuthState, data, loading } = useAuthState();
  const router = useRouter();

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

  function checkRole(page) {
    if (loading) return;

    if (data?.role != "owner" && page === "financial") {
      toast.error("You don't have access");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }

    if (data?.role != "owner" && page === "account") {
      toast.error("You don't have access");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }

  return {
    signin,
    logout,
    checkRole,
  };
};

export default useAuth;
