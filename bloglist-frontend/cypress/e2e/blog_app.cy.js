/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tino Teittinen',
      username: 'TMT',
      password: 'salainensana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('TMT')
      cy.get('#password').type('salainensana')
      cy.get('#login-button').click()

      cy.contains('Currenty logged in as Tino Teittinen')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('TMT')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('TMT')
      cy.get('#password').type('salainensana')
      cy.get('#login-button').click()
    })

    it.only('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('best author')
      cy.get('#url').type('shady url')
      cy.get('#create-button').click()
      cy.contains('cancel').click()
      cy.contains('new title')
    })
  })
})


  