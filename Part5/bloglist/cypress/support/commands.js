// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("resetDb", function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
})

Cypress.Commands.add("login", function ({ username, password }) {
    cy.request("POST", `${Cypress.env("BACKEND")}/login`, { username, password }).then(({ body }) => localStorage.setItem("loggedUser", JSON.stringify(body))
    )

    cy.visit("")
})

Cypress.Commands.add("loginViaUi", function ({ username, password }) {
    cy.get("#login-username").type(username)
    cy.get("#login-password").type(password)
    cy.get("#login-button").click()
})

Cypress.Commands.add("createBlog", function ({ title, author, url }) {
    cy.request({
        url: `${Cypress.env("BACKEND")}/blogs`,
        method: "POST",
        body: { title, author, url },
        headers: {
            "Authorization": `bearer ${JSON.parse(localStorage.getItem("loggedUser")).token}`
        }
    })

    cy.visit("")
})

Cypress.Commands.add("createNewUser", function ({ username, name, password }) {
    const newUser = {
        username: username,
        name: name,
        password: password
    }

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, newUser)
})

Cypress.Commands.add("likeBlog", function (blogTitle) {
    // cy.contains(blogTitle).find(".button").then(($button) => {
    //     if ($button.text().includes("view")) {
    //         cy.contains(blogTitle).contains("view").click()
    //         cy.contains(blogTitle).siblings(".blogDetails").find(".buttonLike").click()
    //     } else if (($button.text().includes("hide"))){
    //         cy.contains(blogTitle).siblings(".blogDetails").find(".buttonLike").click()
    //     }
    // })

    cy.contains(blogTitle).contains("view").click()
    cy.contains(blogTitle).siblings(".blogDetails").find(".buttonLike").click()
    cy.contains(blogTitle).contains("hide").click()
})