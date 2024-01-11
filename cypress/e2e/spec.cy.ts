describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('GET call for schema list', () => {
    cy.request('GET', 'http://localhost:3002/api/v1/schemalist')
    .its('status')
    .should('equal', 200)
  })

  it('GET call for schema get details', () => {
    cy.request('GET', 'http://localhost:3002/api/v1/schemaget')
    .its('status')
    .should('equal', 200)
  })

  it('POST call for config update', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/configupdate',
      body: {
        app: "FinanceApp",
        module: "PaymentGateway",
        ver: 2,
        config: "ProdConfig",
        description: "Configuration schema of the PaymentGateway module in FinanceApp.",
        values: [
          {name: "transactionTimeout", "value": 5},
          {name: "currencyType", "value": "USD"},
        ]
    }
    })
    .its('status')
    .should('equal', 200)
  })

  // it('GET call for config list', () => {
  //   cy.request('GET', 'http://localhost:3002/api/v1/configlist')
  //   .its('status')
  //   .should('equal', 200)
  // })

  it('GET call for config get details', () => {
    cy.request('GET', 'http://localhost:3002/api/v1/configget')
    .its('status')
    .should('equal', 200)
  })

  it('POST call for config set', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/configset',
      body: {
          app: "FinanceApp",
          module: "PaymentGateway",
          ver: 2,
          config: "ProdConfig",
          key: "transactionTimeout",
          value: 30
    }
    })
    .its('status')
    .should('equal', 200)
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
    cy.get('[name="edit-button"]').should('be.visible')
  })
})

