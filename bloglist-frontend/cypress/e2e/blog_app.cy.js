/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tino Teittinen',
      username: 'TMT',
      password: 'salainensana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    const user2 = {
      name: 'Tino Wronguser',
      username: 'TWT',
      password: 'salainensana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
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
      cy.login({ username: 'TMT', password: 'salainensana' })
    })

    it('A blog can be created', async function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('best author')
      cy.get('#url').type('shady url')
      cy.get('#create-button').click()
      cy.contains('cancel').click()
      cy.contains('new title')
    })

    it('User can like a blog', function() {
      cy.createBlog({
        title: 'new title',
        author: 'best author',
        url: 'shady url'
      })
      cy.contains('view').click()
      cy.get('#likes')
      .should('contain', 0)
      cy.get('#like-button').click()
      cy.get('.success')
      .should('contain', 'your like has been added')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('#likes')
      .should('contain', 1)
    })

    it('User can delete own blog', function() {
      cy.createBlog({
        title: 'new title',
        author: 'best author',
        url: 'shady url'
      })
      cy.contains('view').click()

      cy.get('#remove-button').click()
      cy.get('.success')
      .should('contain', 'blog has been deleted')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blogs')
      .should('not.contain', 'new title')
    })

    it('User can NOT delete others blog', function() {
      cy.createBlog({
        title: 'new title',
        author: 'best author',
        url: 'shady url'
      })
      cy.contains('view').click()
      cy.get('.blogs')
      .should('contain', 'new title')
      .get('#remove-button')
      .and('not.have.css', 'display', 'none')

      cy.get('#logout-button').click()
      cy.login({ username: 'TWT', password: 'salainensana' })
      cy.contains('view').click()

      cy.get('.blogs')
      .should('contain', 'new title')
      .get('#remove-button')
      .and('have.css', 'display', 'none')
    })

    it.only('Order by highest like-value first', function() {
      cy.createBlog({
        title: 'last',
        author: 'best author',
        url: 'shady url',
        likes: 1
      })
      cy.createBlog({
        title: 'middle',
        author: 'best author',
        url: 'shady url',
        likes: 2
      })
      cy.createBlog({
        title: 'first',
        author: 'best author',
        url: 'shady url',
        likes: 3
      })

      cy.get('.li').eq(0).contains('view').click()
      cy.get('.li').eq(1).contains('view').click()
      cy.get('.li').eq(2).contains('view').click()

      cy.get('.li').eq(2).contains('like').click()
      cy.get('.li').eq(0).contains('like').click()

      cy.get('.li').eq(2).contains('like').click()

      cy.get('.li').eq(0)
      .should('contain', 2)
      cy.get('.li').eq(1)
      .should('contain', 1)
      cy.get('.li').eq(2)
      .should('contain', 0)
    })
  })
})


  