/// <reference types="cypress" />

describe("my first E2E test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("ekranda 5 tane input görünmeli", () => {
    cy.get("input").should("have.length", 5);
  });

  it("İsim boşken hata görünmeli", () => {
    // ilk inputu seç
    cy.get('[data-cy="fname"]')
      // içine bir şey yaz isim yaz
      .type(`Berk`)
      // sonra sil
      .clear();
    // ekrana bak .error classı olan bir adet alan olmalı
    cy.get(".error").should("have.length", 1);
  });

  it("Eposta boşken ve hatalı girdi olduğunda hata görünmeli", () => {
    // ilk inputu seç
    cy.get('[data-cy="femail"]')
      // içine bir şey yaz isim yaz
      .type(`berk@berk.com`)
      // sonra sil
      .clear();
    // ekrana bak .error classı olan bir adet alan olmalı
    // eposta zorunlu hatası
    cy.get(".error").should("have.length", 1);

    cy.get('[data-cy="femail"]').type(`berkber`);

    cy.get(".error").should("have.length", 1);

    // eposta hatalı hatası
    cy.get(".error").should(
      "have.text",
      "Hata: Epostanda bir hata olabilir mi?"
    );
  });

  it("parola alanı uzunluğunu test et", () => {
    cy.get('[data-cy="fpass"]')
      //3 karakter yaz
      .type("123");
    //ekranda hata mesajı görmeyi bekliyorum
    cy.get(".error").should("exist");
    //metni de bu "bla bla bla"
    cy.get(".error").should(
      "have.text",
      "Hata: bu kadar kısa olmassın en az 6 karakter :)"
    );
    //parola alanını seç
    cy.get('[data-cy="fpass"]')
      //parola yaz 6 karakter yazıyorum
      .type("123");
    //ekranda hata mesajı görmemeyi bekliyorum
    // cy.get(".error").should("not.exist");
    cy.get(".error").should("have.length", 0);
    //parola alanına tıkla
  });

  it("şartların kabulünü test et", () => {
    //Kutucuğu bul ve tıkla
    //1 kere tıkla,hata mesajı olmamalı.
    // Bir daha tıkla hata mesajı olmalı
    // Hata: Veri paylaşımı bla bla
    cy.get('[data-cy="fterms"]').click();
    cy.get(".error").should("have.length", 0);
    cy.get('[data-cy="fterms"]').click();
    cy.get(".error").should("have.length", 1);
  });
});

// Formda 4 input 1 checbox olacak
