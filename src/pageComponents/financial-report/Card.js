export default function Card({ amount, title }) {
  return (
    <div className="col-span-3 w-full border-2 py-5 px-3 shadow-md bg-gray-50 rounded-lg">
      <p className="font-medium text-[13px] pb-2">{title} :</p>
      <p className="text-2xl font-semibold">{amount}</p>
    </div>
  );
}
