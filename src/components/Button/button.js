import Link from "next/link";

export default function LinkButton({
  label,
  href,
  icon,
  w,
  disable,
  handleClick,
}) {
  return !disable ? (
    <Link
      className={`main-btn ${
        w ? w : " w-56"
      } bg-yellow-400 hover:bg-yellow-500 text-black font-medium justify-center`}
      href={href}
    >
      {icon}
      <span className="inline-block">{label}</span>
    </Link>
  ) : (
    <div
      onClick={() => handleClick()}
      className={`main-btn ${
        w ? w : " w-56"
      } bg-gray-100 hover:bg-gray-200 text-black/50 font-medium justify-center`}
      href={href}
    >
      {icon}
      <span className="inline-block">{label}</span>
    </div>
  );
}

export function MyButton({
  w,
  label,
  tab,
  selectedTab,
  icon,
  handleClick,
  disable,
  c,
  tc,
  p,
}) {
  return !disable ? (
    <div
      onClick={() => handleClick(tab)}
      className={`${p && p} main-btn ${w ? w : " w-56"} ${c && c} ${
        tc && tc
      }  ${
        selectedTab == tab
          ? "bg-yellow-400 hover:bg-yellow-500"
          : "bg-yellow-200 hover:bg-yellow-400"
      } text-black font-medium justify-center`}
    >
      <span>{icon}</span>
      <span className="inline-block text-[13px]">{label}</span>
    </div>
  ) : (
    <div
      className={`main-btn ${
        w ? w : " w-56"
      } bg-gray-100 text-[13px] cursor-default hover:bg-gray-200 text-black/50 font-medium justify-center`}
    >
      {icon}
      <span className="inline-block">{label}</span>
    </div>
  );
}
