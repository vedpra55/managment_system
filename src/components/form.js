import React, { useEffect } from "react";
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

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
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
                {!item?.values && item.type !== "autoID" && !item?.optional && (
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
