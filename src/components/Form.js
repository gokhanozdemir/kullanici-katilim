import React, { useState } from "react";
import * as Yup from "yup";

function Form() {
  const emptyForm = {
    fname: "f",
    flname: "l",
    femail: "e",
    fpass: "p",
    fterms: false,
  };
  const [formData, setFormData] = useState(emptyForm);

  const formSchema = Yup.object().shape({
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
  const olala = "Gökhan";
  const formOnChange = (event) => {
    console.log("event:", event.target.name, event.target.value);
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value, // dynamic object key
    };
    setFormData(updatedFormData);
    // formSchema
    //   .validate(formData)
    //   .then(// success)
    //   .catch(function (err) {
    //     // err.name; // => 'ValidationError'
    //     // err.errors; // => ['Deve ser maior que 18']
    //   });
  };

  return (
    <form onSubmit={() => null}>
      <div className="input-row">
        <label htmlFor="fname">İsim:</label>
        <input
          type="text"
          onChange={(e) => formOnChange(e)}
          id="fname"
          name="fname"
          value={formData.fname}
        />
        <div className="error">Hata: </div>
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
        <div className="error">Hata: </div>
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
        <div className="error">Hata: </div>
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
        <div className="error">Hata: </div>
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
