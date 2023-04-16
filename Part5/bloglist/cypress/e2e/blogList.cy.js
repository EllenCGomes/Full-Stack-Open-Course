describe("Blog app", function () {

  beforeEach(function () {
    cy.resetDb()
    cy.createNewUser({ username: "test", name: "test", password: "test" })
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Login")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "test", password: "test" })
      cy.contains("test is logged in")
    })

    it("fails with wrong credentials", function () {
      cy.loginViaUi({ username: "test", password: "wrong password" })
      cy.get(".error").should("contain", "Wrong username or password").and("have.css", "color", "rgb(255, 0, 0)")
      cy.contains("test logged in").should("not.exist")
    })

    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({ username: "test", password: "test" })
      })

      it("A blog can be created", function () {
        cy.createBlog({ title: "test title", author: "test author", url: "test url" })
        cy.contains("test title - test author")
      })

      describe("When blogs are created", function () {

        beforeEach(function () {
          cy.createBlog({ title: "test title", author: "test author", url: "test url" })
          cy.createBlog({ title: "test title 2", author: "test author 2", url: "test url 2" })
          cy.createBlog({ title: "test title 3", author: "test author 3", url: "test url 3" })
        })

        it("Users can like a blog", function () {
          cy.likeBlog("test title 2 - test author 2")
          cy.contains("test title 2 - test author 2").siblings(".blogDetails").contains("Likes:1")
        })

        it("Users can delete a blog", function () {
          cy.contains("test title 2 - test author 2").contains("view").click()
          cy.contains("test title 2 - test author 2").siblings(".blogDetails").find("#remove-button").click()
          cy.should("not.contain", "test title 2 - test author 2")

        })

        it("Only the creator can see the delete button", function () {
          cy.contains("Logout").click()
          cy.createNewUser({ username: "abc", name: "abc", password: "abc" })
          cy.login({ username: "abc", password: "abc" })
          cy.contains("test title 2 - test author 2").contains("view").click()
          cy.contains("test title 2 - test author 2").siblings(".blogDetails").should("not.contain", "#remove-button")
        })

        it("Blogs are ordered on desc order, according to the number of likes", function () {
          cy.contains("test title 2 - test author 2").contains("view").click()
          cy.contains("test title 2 - test author 2").siblings(".blogDetails").contains("like").click()
          cy.contains("test title 2 - test author 2").contains("hide").click()

          cy.contains("test title 3 - test author 3").contains("view").click()
          cy.contains("test title 3 - test author 3").siblings(".blogDetails").contains("like").click()
          cy.contains("test title 3 - test author 3").contains("hide").click()


          cy.get(".blog").eq(0).should("contain", "test title 2 - test author 2")
          cy.get(".blog").eq(1).should("contain", "test title 3 - test author 3")
          cy.get(".blog").eq(2).should("contain", "test title - test author")
        })

      })
    })
  })
})