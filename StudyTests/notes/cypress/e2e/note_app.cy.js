describe("Note app", function () {

  beforeEach(function () {
    cy.request("POST", `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: "test",
      username: "test",
      password: "test"
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
    cy.visit("")
  })

  it("front page can be opened", function () {
    cy.contains("Notes")
  })

  it("login form can be opened", function () {
    cy.contains("Log In").click()
  })

  it("user can login", function () {
    cy.login({ username: "test", password: "test" })

    cy.contains("test logged in")
  })

  it("login fails with wrong password", function () {
    cy.contains("Log In").click()
    cy.get("#username").type("test")
    cy.get("#password").type("wrong password")
    cy.get("#login-button").click()

    cy.get(".error")
      .should("contain", "wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")

    cy.contains("test logged in").should("not.exist")
  })

  describe("when logged in", function () {

    beforeEach(function () {
      cy.login({ username: "test", password: "test" })
    })

    it("a new note can be created", function () {
      cy.createNote({
        content: "creating new note with cypress",
        important: true
      })

      cy.contains("creating new note with cypress")
    })

    describe("and several notes exist", function () {

      beforeEach(function () {
        cy.createNote({ content: "first note with cypress", important: false })
        cy.createNote({ content: "second note with cypress", important: false })
        cy.createNote({ content: "third note with cypress", important: false })
      })

      it("one of those notes can be made important", function () {
        cy.contains("second note with cypress").parent().find("button").as("theButton")
        cy.get("@theButton").click()
        cy.get("@theButton").should("contain", "make not important")
      })
    })
  })

})
