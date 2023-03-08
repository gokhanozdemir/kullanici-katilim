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
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="input-row">
        <label htmlFor="fname">İsim:</label>
        <input
          type="text"
          onChange={(e) => formOnChange(e)}
          id="fname"
          name="fname"
          value={formData.fname}
        />
        {formError.fname && (
          <div className="error">Hata: {formError["fname"]}</div>
        )}
      </div>
      <div className="input-row">
        <label htmlFor="flname">Soyisim:</label>
        <input
          type="text"
          onChange={(e) => formOnChange(e)}
          id="flname"
          name="flname"
          value={formData.flname}
        />
        {formError.flname && (
          <div className="error">Hata: {formError.flname}</div>
        )}
      </div>
      <div className="input-row">
        <label htmlFor="femail">Eposta</label>
        <input
          type="text"
          onChange={(e) => formOnChange(e)}
          id="femail"
          name="femail"
          value={formData.femail}
        />
        {formError.femail && (
          <div className="error">Hata: {formError.femail} </div>
        )}
      </div>
      <div className="input-row">
        <label htmlFor="fpass">Parola</label>
        <input
          type="password"
          onChange={(e) => formOnChange(e)}
          id="fpass"
          name="fpass"
          value={formData.fpass}
        />
        {formError.fpass && (
          <div className="error">Hata: {formError.fpass}</div>
        )}
      </div>
      <div className="input-row">
        <label htmlFor="fterms">Onay</label>
        <input
          type="checkbox"
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
      <div className="input-row">
        <button type="submit" value="Submit">
          Gönder Gitsin
        </button>
      </div>
    </form>
  );
}

export default Form;
