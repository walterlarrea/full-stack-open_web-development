describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })


  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#new-blog-title').type('a blog created by cypress')
      cy.get('#new-blog-author').type('cypress')
      cy.get('#new-blog-url').type('cy no url')
      cy.get('.submitForm').contains('create').click()

      cy.contains('a blog created by cypress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog and the second most liked',
          author: 'first author',
          url: 'first url'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'second author',
          url: 'second url'
        })
        cy.createBlog({
          title: 'third blog and most liked',
          author: 'third author',
          url: 'third url'
        })
      })

      it('one of those can be given a "like"', function () {
        cy.contains('second blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()

        cy.contains('second blog').parent().contains('like').as('likeButton')
        cy.get('@likeButton').click()
        cy.get('@likeButton').click()

        cy.contains('second blog')
          .parent()
          .contains('likes: 2')
      })

      it('one of those can be deleted by user who created it', function () {
        cy.contains('second blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()

        cy.contains('second blog').parent().contains('remove').as('removeButton')
        cy.get('@removeButton').click()

        cy.get('html').should('not.contain', 'second blog')
      })

      it('these get sorted by number of likes', function () {
        cy.contains('first blog and the second most liked')
          .parent().find('button').click()
        cy.contains('first blog and the second most liked')
          .parent().contains('likes:')
          .contains('like').as('firstLikeButton')
        cy.get('@firstLikeButton').click()

        cy.contains('third blog and most liked')
          .parent().find('button').click()
        cy.contains('third blog and most liked')
          .parent().contains('likes:')
          .contains('like').as('thirdLikeButton')
        cy.get('@thirdLikeButton').click()
        cy.get('@thirdLikeButton').click()

        cy.visit('http://localhost:3000')

        cy.get('.blog').eq(0).should('contain', 'third blog and most liked')
        cy.get('.blog').eq(1).should('contain', 'first blog and the second most liked')
      })

      describe('and another user logs in', function () {
        it('one of those can not be deleted by another user', function () {
          const anotherUser = {
            name: 'No Body',
            username: 'noone',
            password: 'salainen'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
          cy.visit('http://localhost:3000')
          cy.login({ username: 'noone', password: 'salainen' })

          cy.contains('second blog').parent().find('button').as('viewButton')
          cy.get('@viewButton').click()

          cy.contains('second blog').parent().should('not.contain', 'remove')
        })
      })
    })
  })
})