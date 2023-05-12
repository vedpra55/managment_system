import { TextInput } from "@/components/Input/input";
import Sidebar from "@/components/Sidebar/sidebar";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { signin } = useAuth();
  const { handleSubmit, register } = useForm();

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "password",
      type: "text",
      placeholder: "Passoword",
      required: true,
    },
  ];

  async function handleFormSubmit(data) {
    await signin(data.email, data.password);
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="my-container ">
        <h2 className="text-2xl font-semibold mb-5">Login</h2>
        <form
          className="grid grid-cols-12 bg-white myshadow px-5 py-5 rounded-lg"
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
        >
          {fields.map((item) => (
            <div className="col-span-6" key={item.name}>
              <label>{item.placeholder}</label>
              <TextInput
                register={register}
                required={true}
                name={item.name}
                type={item.type}
                label={item.label}
              />
            </div>
          ))}
          <button className="main-btn mt-5">Submit</button>
        </form>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(page, pageProps) {
  return <Sidebar {...pageProps}>{page}</Sidebar>;
};
