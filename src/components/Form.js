import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

function Form() {
  const emptyForm = {
    fname: "",
    flname: "",
    femail: "",
    fpass: "",
    fterms: false,
  };
  const initalMembers = [
    {
      fname: "Rumeysa",
      flname: "İleri",
      femail: "r@r.com",
      fpass: "123456",
      fterms: true,
    },
    {
      fname: "Berk",
      flname: "Akaz",
      femail: "b@b.com",
      fpass: "123466",
      fterms: true,
    },
  ];
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState([]);
  const [teamMembers, setteamMembers] = useState(initalMembers);

  const rumeysaSchema = Yup.object().shape({
    fname: Yup.string().required("Dostum adın ne?"),
    flname: Yup.string().required("Ama soy adın da gerekli :/"),
    femail: Yup.string()
      .email("Epostanda bir hata olabilir mi?")
      .required("Spamlamamız için gerekli :)"),
    fpass: Yup.string()
      .required("şifre nedir")
      .min(6, "bu kadar kısa olmassın en az 6 karakter :)"),
    fterms: Yup.boolean().oneOf([true], "Veri paylaşımı bla bla"),
  });

  const checkError = (name, value) => {
    // console.log(checkErrors)
    Yup.reach(rumeysaSchema, name)
      .validate(value)
      .then(() => {
        setFormError({
          ...formError,
          [name]: null,
        });
      })
      .catch((err) => {
        // console.log("err", err.errors);
        setFormError({
          ...formError,
          [name]: err.errors[0],
        });
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    axios.post("https://reqres.in/api/users", formData).then((res) => {
      setteamMembers([...teamMembers, res.data]);
    });
  }

  // forma değer girdikçe
  const formOnChange = (event) => {
    // isterseniz destructre edebilirsiniz
    //const { value, type, checked, name } = e.target;
    // console.log("event:", event.target.name, event.target.value);
    const updatedFormData = {
      ...formData,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value, // dynamic object key
    };
    setFormData(updatedFormData);
    checkError(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  return (
    <form
      className="overflow-hidden shadow sm:rounded-md m-10"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6"></div>
          <div className="col-span-6 sm:col-span-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="fname"
            >
              İsim:
            </label>
            <input
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              data-cy="fname"
              onChange={(e) => formOnChange(e)}
              id="fname"
              name="fname"
              value={formData.fname}
            />
            {formError.fname && (
              <div className="error">Hata: {formError["fname"]}</div>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="flname"
            >
              Soyisim:
            </label>
            <input
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              data-cy="flname"
              onChange={(e) => formOnChange(e)}
              id="flname"
              name="flname"
              value={formData.flname}
            />
            {formError.flname && (
              <div className="error">Hata: {formError.flname}</div>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="femail"
            >
              Eposta
            </label>
            <input
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              data-cy="femail"
              onChange={(e) => formOnChange(e)}
              id="femail"
              name="femail"
              value={formData.femail}
            />
            {formError.femail && (
              <div className="error">Hata: {formError.femail}</div>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="fpass"
            >
              Parola
            </label>
            <input
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="password"
              data-cy="fpass"
              onChange={(e) => formOnChange(e)}
              id="fpass"
              name="fpass"
              value={formData.fpass}
            />
            {formError.fpass && (
              <div className="error">Hata: {formError.fpass}</div>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="fterms"
            >
              Şartların kabulü
            </label>
            <input
              className="mt-2 block  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="checkbox"
              data-cy="fterms"
              onChange={(e) => formOnChange(e)}
              id="fterms"
              name="fterms"
              value="Approved"
              checked={formData.fterms}
            />
            {formError.fterms && (
              <div className="error">Hata: {formError.fterms}</div>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
              data-cy="submitBtn"
              value="Submit"
            >
              Gönder Gitsin
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
