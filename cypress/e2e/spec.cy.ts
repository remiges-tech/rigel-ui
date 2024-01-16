describe('Rigel test cases', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Rigel');
  })

  it('check for the app module dropdown', () => {
    cy.get('#app').should('be.visible')
  })

  it('select App name and module name should be visible', () => {
    cy.selectValueFromDropdown('#app', 'FinanceApp')
    cy.get('#module').should('be.visible');
  })

  it('select Module name and schema data should be visible', () => {
    cy.selectValueFromDropdown('#app', 'FinanceApp')
    cy.get('#module').should('be.visible');
    cy.selectValueFromDropdown('#module', 'PaymentGateway')
    cy.get('#config').should('be.visible');
  })

  it('select Config name and config value should be visible', () => {
    cy.selectValueFromDropdown('#app', 'FinanceApp')
    cy.get('#module').should('be.visible');
    cy.selectValueFromDropdown('#module', 'PaymentGateway')
    cy.get('#config').should('be.visible');
    cy.selectValueFromDropdown('#config', 'ProdConfig')
    cy.get('[name="transactionTimeout-edit-button"]').should('be.visible')
  })
})

