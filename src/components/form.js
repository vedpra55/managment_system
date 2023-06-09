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
  fromStockUsage,
}) {
  const { handleSubmit, register, watch, reset } = useForm();

  const orderType = watch("orderType");
  const realCylinderNumber = watch("cylinderNumber");
  const fillingStatus = watch("isFilled");

  const [cylinderStock, setCylinderStock] = useState([]);
  const [partStocks, setPartStocks] = useState([]);
  const [cylinderNumber, setCylinderNumber] = useState("");
  const [sparePartText, setSparePartText] = useState("");

  async function handleCylinderSearch() {
    if (cylinderNumber) {
      const res = await fetch(
        `/api/cylinder-stock?cylinderNumber=${cylinderNumber.toString()}`
      );

      const json = await res.json();

      setCylinderStock(json?.cylinderStock);
    }
  }

  async function handlePartStockSeach() {
    if (sparePartText) {
      const res = await fetch(
        `/api/fire-extinguisher-store/parts-stock?sparePart=${sparePartText.toString()}`
      );

      const json = await res.json();

      setPartStocks(json?.partStocks);
    }
  }

  useEffect(() => {
    handleCylinderSearch();
  }, [cylinderNumber]);

  useEffect(() => {
    handlePartStockSeach();
  }, [sparePartText]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (fillingStatus === true) {
      reset({
        quantity: 1,
      });
    }
  }, [fillingStatus]);

  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

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
                  item.type !== "product" &&
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
                {item.type === "product" && fromStockUsage && (
                  <div>
                    <TextInput
                      type={"text"}
                      label={item.placeholder}
                      name={item.name}
                      register={register}
                    />
                    <input
                      value={sparePartText}
                      onChange={(e) => setSparePartText(e.target.value)}
                      className="mt-2 w-[80%] overflow-hidden focus:scale-105 transition-all rounded-xl py-1 outline-gray-300  bg-transparent focus:shadow-lg px-5 border-2 placeholder:text-gray-500"
                      type="text"
                      placeholder="search product"
                    />
                    <div>
                      {partStocks?.map((item) => (
                        <div
                          onClick={() => reset({ product: item.spareType })}
                          className="my-2 bg-gray-100 rounded-lg font-medium text-[14px] py-2 px-4 cursor-pointer hover:bg-gray-300 w-64"
                          key={item._id}
                        >
                          {item.spareType}
                        </div>
                      ))}
                    </div>
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
