import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className=" container mx-auto px-10 h-20 flex items-center justify-end ">
        <div>
          <div className="flex gap-x-5">
            <h3 className="text-2xl font-semibold">Welcome ved</h3>
            <button>
              <img
                src="https://stocky.untitledsoft.com/images/avatar/no_avatar.png"
                alt="avatar"
                className="w-10"
              />
            </button>
          </div>
        </div>
      </header>
      <hr />
    </>
  );
}
