// In your Cypress test file (e.g., cypress/integration/api.spec.js)

describe('Frontend Testing with Stubbed API Response for data not found', () => {
    beforeEach(() => {
      cy.visit('/');
    });

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
  });
  