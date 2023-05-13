import { useAuthState } from "@/context/authContext";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function Header() {
  const { data, loading } = useAuthState();
  const { logout } = useAuth();

  const role = data?.role;

  return (
    <>
      <header className=" container mx-auto px-10 h-20 flex items-center justify-end ">
        <div>
          {data && !loading ? (
            <div className="flex gap-x-5">
              <div>
                <p className="text-[15px] font-medium pt-1">
                  Role - {data?.role}
                </p>
                <p
                  onClick={() => logout()}
                  className=" text-red-500 font-medium cursor-pointer  "
                >
                  Logout
                </p>
              </div>
              {role === "owner" && (
                <Link href={"/account"} className="main-btn">
                  Account
                </Link>
              )}
            </div>
          ) : (
            <div>
              <Link className="main-btn" href={"/account/login"}>
                Login
              </Link>
            </div>
          )}
        </div>
      </header>
      <hr />
    </>
  );
}
