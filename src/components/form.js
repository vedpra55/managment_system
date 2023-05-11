import React, { useEffect, useState } from "react";
import { TextInput, SelectInput } from "./Input/input";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { FaSave } from "react-icons/fa";

function Form({
  fields,
  handleSumbitForm,
  submitRef,
  isInvoice,
  invoice,
  setInvoice,
  title,
  defaultValues,
}) {
  const { handleSubmit, register, watch, reset } = useForm();

  const orderType = watch("orderType");
  const realCylinderNumber = watch("cylinderNumber");
  const [cylinderStock, setCylinderStock] = useState([]);
  const [cylinderNumber, setCylinderNumber] = useState("");

  async function handleSearch() {
    if (cylinderNumber) {
      const res = await fetch(
        `/api/cylinder-stock?cylinderNumber=${cylinderNumber.toString()}`
      );

      const json = await res.json();

      setCylinderStock(json?.cylinderStock);

      console.log(json);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [cylinderNumber]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <button
          onClick={() => {
            submitRef.current?.click();
          }}
          className="main-btn bg-blue-600 hover:bg-blue-700"
        >
          <FaSave />
          <span>Save</span>
        </button>
      </div>
      <div className="w-full mt-10  bg-white rounded-lg myshadow">
        <form
          onSubmit={handleSubmit((data) => handleSumbitForm(data))}
          className="grid grid-cols-12 gap-5 p-5"
        >
          {fields.map((item) => (
            <React.Fragment key={item.placeholder}>
              <div className="col-span-6">
                {!item?.values &&
                  item.type !== "autoID" &&
                  item.type !== "textArea" &&
                  !item?.optional && (
                    <TextInput
                      type={item?.type}
                      label={item.placeholder}
                      name={item.name}
                      register={register}
                    />
                  )}
                {item?.values && (
                  <SelectInput
                    values={item?.values}
                    label={item.placeholder}
                    name={item.name}
                    register={register}
                  />
                )}
                {item?.type === "autoID" && isInvoice && (
                  <div>
                    <p>{invoice}</p>
                    <div
                      onClick={() => {
                        const id = uuid();
                        setInvoice(id);
                      }}
                      type="button"
                      className="main-btn mt-2 w-40 text-[14px] "
                    >
                      Generate Invoice
                    </div>
                  </div>
                )}
                {item?.optional && orderType === "TESTING" && (
                  <>
                    <label className=" block text-[14px] font-medium">
                      {item.placeholder}
                    </label>
                    <input
                      required={item.required}
                      {...register(item.name)}
                      type={item.type}
                      className="mt-2 w-[80%] overflow-hidden focus:scale-105 transition-all rounded-xl py-3 outline-gray-300  bg-transparent focus:shadow-lg px-5 border-2"
                    />
                  </>
                )}
                {item.type === "textArea" && (
                  <div className="flex flex-col">
                    <label className=" block text-[14px] font-medium mt-2">
                      {item.placeholder}
                    </label>
                    <textarea
                      className="mt-2 w-[80%] overflow-hidden focus:scale-105 transition-all rounded-xl py-3 outline-gray-300  bg-transparent focus:shadow-lg px-5 border-2"
                      required={item.required}
                      {...register(item.name)}
                      rows={4}
                    />

                    {item.search && (
                      <input
                        value={cylinderNumber}
                        onChange={(e) => setCylinderNumber(e.target.value)}
                        className="mt-2 w-[80%] overflow-hidden focus:scale-105 transition-all rounded-xl py-1 outline-gray-300  bg-transparent focus:shadow-lg px-5 border-2 placeholder:text-gray-500"
                        type="text"
                        placeholder="search cylinder number"
                      />
                    )}

                    {item.search &&
                      cylinderStock?.length > 0 &&
                      cylinderStock?.map(
                        (item) =>
                          item.quantity > 0 && (
                            <div
                              className="my-2 bg-gray-100 rounded-lg font-medium text-[14px] py-2 px-4 cursor-pointer hover:bg-gray-300 w-64"
                              key={item.key}
                            >
                              <p
                                onClick={() => {
                                  const d = {
                                    cylinderNumber: realCylinderNumber
                                      ? realCylinderNumber +
                                        "\r\n" +
                                        item.cylinderNumber
                                      : item.cylinderNumber,
                                  };
                                  reset(d);
                                }}
                              >
                                {item.cylinderNumber}
                              </p>
                            </div>
                          )
                      )}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
          <input type="submit" ref={submitRef} className=" hidden" />
        </form>
      </div>
    </>
  );
}

export default React.forwardRef(Form);
