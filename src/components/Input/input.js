export function TextInput({ label, register, type, name, required }) {
  return (
    <>
      <label className=" block text-[14px] font-medium">{label}</label>
      <input
        required={required}
        {...register(name)}
        type={type}
        className="mt-2 w-[80%] overflow-hidden focus:scale-105 transition-all rounded-xl py-3 outline-gray-300  bg-transparent focus:shadow-lg px-5 border-2"
      />
    </>
  );
}

export function SelectInput({ label, register, values, name }) {
  return (
    <>
      <label className=" block text-[14px] font-medium">{label}</label>
      <select
        className="col-span-6 mt-2 outline-gray-300 focus:scale-105 transition-all focus:shadow-lg w-[80%] bg-white border-2 rounded-lg py-3 px-5"
        {...register(name)}
      >
        {values.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </>
  );
}
