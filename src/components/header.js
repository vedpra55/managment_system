import { useAuthState } from "@/context/authContext";
import Link from "next/link";

export default function Header() {
  const { data, isLoading } = useAuthState();

  console.log(data);

  return (
    <>
      <header className=" container mx-auto px-10 h-20 flex items-center justify-end ">
        <div>
          {data && !isLoading ? (
            <div className="flex gap-x-5">
              <div>
                <h3 className="text-2xl font-semibold">Welcome {data?.name}</h3>
                <p className="text-[15px] font-medium pt-1">
                  Role - {data?.role}
                </p>
              </div>
              <button>
                <img
                  src="https://stocky.untitledsoft.com/images/avatar/no_avatar.png"
                  alt="avatar"
                  className="w-10"
                />
              </button>
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
