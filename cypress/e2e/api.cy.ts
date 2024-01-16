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
  
    it('Handles API Data Not Found', () => {
      // Stub the GET API response when the backend is not available
      cy.intercept('GET', '/api/v1/schemaget', {
        statusCode: 200,
        body: {
          response: {},
          status: 'Failed',
          statusCode: 200,
          message: 'Data not found!'
        }
      }).as('getData');
  
      // For example, if your API request is triggered on button click:
      cy.get('#module').should('be.visible')
  
      // Wait for the API request to complete
      cy.wait('@getData');
      
  
      cy.get('.toast-message').should('contain','Data not found')
    });
  });
  