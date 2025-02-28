describe('Test case for i18n', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Select Language From the dropdown', () => {
        cy.get('.language-select').eq(0).select('gu')
    })
  })
  
  