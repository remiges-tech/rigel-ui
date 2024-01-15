describe('Check for Schema Details', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Successfully displayed schema details when schema details is present for the app and module', () => {
        cy.selectValueFromDropdown('#app', 'FinanceApp')
        cy.selectValueFromDropdown('#module', 'PaymentGateway')
        cy.get('#appDescription').should('be.visible')
        cy.get('#appDescription').should('have.text','Configuration schema for version 2 of the PaymentGateway module in FinanceApp.')
        cy.get('#appVersion').should('have.text','2')
        cy.get('#fields-list app-field-detail').each(($li:any) => {
            cy.wrap($li).get('#transactionTimeout').should('have.text','transactionTimeout')
            cy.wrap($li).get('#transactionTimeout-description').should('have.text','TransactionTimeout in milli seconds')
            cy.wrap($li).get('#transactionTimeout-type').should('have.text','int')
        })
    })

    it('Faild to display schema detail when data is not present', () => {
        cy.selectValueFromDropdown('#app', 'FinanceApp')
        cy.selectValueFromDropdown('#module', 'AccountingModule')
        cy.get('#appDescription').should('be.hidden')
        cy.get('#appVersion').should('have.text','3')
        cy.get('.toast-title').should('have.text',' Error ')
        cy.get('.toast-message').should('contain','Data not found')
    })
  })
  
  