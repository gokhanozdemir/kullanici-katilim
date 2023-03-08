import React from "react";

function Form() {
  return (
    <form onSubmit={() => null}>
      <div className="input-row">
        <label htmlFor="fname">İsim:</label>
        <input type="text" id="fname" name="fname" value="John" />
        <div className="error">Hata: </div>
      </div>
      <div className="input-row">
        <label htmlFor="lname">Soyisim:</label>
        <input type="text" id="lname" name="lname" value="Doe" />
        <div className="error">Hata: </div>
      </div>
      <div className="input-row">
        <label htmlFor="femail">Eposta</label>
        <input type="text" id="femail" name="femail" value="Doe" />
        <div className="error">Hata: </div>
      </div>
      <div className="input-row">
        <label htmlFor="fpass">Parola</label>
        <input type="password" id="fpass" name="fpass" value="Doe" />
        <div className="error">Hata: </div>
      </div>
      <div className="input-row">
        <label htmlFor="fapprove">Onay</label>
        <input
          type="checkbox"
          id="fapprove"
          name="fapprove"
          value="Approved"
          checked={false}
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
