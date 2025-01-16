// //Rigel Test case for complete flow of  one config parameter
// describe('Rigel work flow', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   it('Test case for complete flow of Rigel Application', () => {
//     //common scenario to select app, module and config from dropdown
//     cy.get('#app').should('be.visible').click();
//     cy.get('.ng-dropdown-panel .ng-option').first().invoke('text').then((app) => {
//       cy.selectValueFromDropdown('#app', app.trim());
//     });
//     cy.wait(500);

//     // Dynamically select a Module
//     cy.get('#module').should('be.visible').click();
//     cy.get('.ng-dropdown-panel .ng-option').first().invoke('text').then((module) => {
//       cy.selectValueFromDropdown('#module', module.trim());
//     });
//     cy.wait(500);

//     // Dynamically select a Config
//     cy.get('#config').should('be.visible').click();
//     cy.get('.ng-dropdown-panel .ng-option').first().invoke('text').then((config) => {
//       cy.selectValueFromDropdown('#config', config.trim());
//     });
//     cy.wait(500);


//     //scenario to handle input type int
//     cy.get('#transactionTimeout-config-parameter')
//       .trigger('mouseover');
//     cy.wait(500)
//     // Click the Edit button
//     cy.get('#transactionTimeout-config-parameter')
//       .parent()
//       .find('.edit-icon')
//       .click();
//     cy.wait(500)
//     // Enter an value below the minimum constraint
//     cy.get('#transactionTimeout-value input')
//       .clear()
//       .type('25')
//       .blur();
//     cy.wait(500)
//     // Wait for approve-icon to become visible
//     cy.get('#transactionTimeout-value')
//       .parent()
//       .find('.approve-icon')
//       .should('be.visible')
//       .click();
//     cy.wait(500)
//     // Handle the modal
//     cy.get('#staticBackdrop')
//       .should('be.visible')
//       .within(() => {
//         cy.get('#staticBackdropLabel')
//           .should('contain.text', 'transactionTimeout');
//         cy.get('.modal-body')
//           .should('contain.text', 'Changing the value of \'transactionTimeout\' will impact the production configuration of the PaymentGateway module in FinanceApp. Are you sure you want to proceed?');
//         cy.get('button').contains('Yes').click();
//       });


//     //scenario to handle input type string(enum-dropdown)
//     cy.get('#currencyType-config-parameter')
//       .parent()
//       .find('.edit-icon')
//       .click();
//     cy.wait(500)
//     cy.get('#currencyType-value')
//       .should('be.visible')
//       .click();
//     // Choose an option from the dropdown
//     cy.get('.ng-dropdown-panel')
//       .contains('INR')
//       .click();
//     // Validate the selected value
//     cy.get('#currencyType-value')
//       .find('.ng-value-label')
//       .should('contain.text', 'INR');
//     cy.get('#currencyType-value')
//       .parent()
//       .find('.approve-icon')
//       .should('be.visible')
//       .click();
//     cy.wait(500)
//     cy.get('#staticBackdrop')
//       .should('be.visible')
//       .within(() => {
//         cy.get('#staticBackdropLabel')
//           .should('contain.text', 'currencyType');
//         cy.get('.modal-body')
//           .should('contain.text', 'Modifying \'currencyType\' will affect the currency settings in the PaymentGateway module of FinanceApp. Confirm if you wish to make this change');
//         cy.get('button').contains('Yes').click();
//       });

//     //scenario to handle input type float
//     cy.get('#maxEmailSize-config-parameter')
//       .trigger('mouseover');
//     cy.wait(500)
//     // Click the Edit button
//     cy.get('#maxEmailSize-config-parameter')
//       .parent()
//       .find('.edit-icon')
//       .click();
//     cy.wait(500)
//     // Enter an value below the minimum constraint
//     cy.get('#maxEmailSize-value input')
//       .clear()
//       .type('45.75')
//       .blur();
//     cy.wait(500)
//     // Wait for approve-icon to become visible
//     cy.get('#maxEmailSize-value')
//       .parent()
//       .find('.approve-icon')
//       .should('be.visible')
//       .click();
//     cy.wait(500)
//     // Handle the modal
//     cy.get('#staticBackdrop')
//       .should('be.visible')
//       .within(() => {
//         cy.get('#staticBackdropLabel')
//           .should('contain.text', 'maxEmailSize');
//         cy.get('.modal-body')
//           .should('contain.text', 'Adjusting \'maxEmailSize\' will influence the email size limits in the PaymentGateway module of FinanceApp. Are you certain you want to update this value?');
//         cy.get('button').contains('Yes').click();
//       });


//       //scenario to handle input type int
//     cy.get('#maxInputSize-config-parameter')
//       .trigger('mouseover');
//     cy.wait(500)
//     // Click the Edit button
//     cy.get('#maxInputSize-config-parameter')
//       .parent()
//       .find('.edit-icon')
//       .click();
//     cy.wait(500)
//     // Enter an value below the minimum constraint
//     cy.get('#maxInputSize-value input')
//       .clear()
//       .type('25')
//       .blur();
//     cy.wait(500)
//     // Wait for approve-icon to become visible
//     cy.get('#maxInputSize-value')
//       .parent()
//       .find('.approve-icon')
//       .should('be.visible')
//       .click();
//     cy.wait(500)
//     // Handle the modal
//     cy.get('#staticBackdrop')
//       .should('be.visible')
//       .within(() => {
//         cy.get('#staticBackdropLabel')
//           .should('contain.text', 'maxInputSize');
//         cy.get('.modal-body')
//           .should('contain.text', 'Changing \'maxInputSize\' will affect the maximum allowable input size in the PaymentGateway module of FinanceApp. Do you want to continue?');
//         cy.get('button').contains('Yes').click();
//       });


//     //scenario to handle input type boolean
//     cy.get('#logLevel-config-parameter')
//       .parent()
//       .find('.edit-icon')
//       .click();
//     cy.wait(500);
//     cy.get('#logLevel-input')
//       .uncheck({ force: true });
//     cy.wait(500);
//     // Validate the checkbox is unchecked
//     cy.get('#logLevel-input')
//       .should('not.be.checked');
//     // Approve the change again
//     cy.get('#logLevel-config-parameter')
//       .parent()
//       .find('.approve-icon')
//       .should('be.visible')
//       .click();
//     cy.wait(500);
//     cy.get('#staticBackdrop')
//       .should('be.visible')
//       .within(() => {
//         cy.get('#staticBackdropLabel')
//           .should('contain.text', 'logLevel');
//         cy.get('.modal-body')
//           .should('contain.text', 'Modifying \'logLevel\' will alter the logging configuration in the PaymentGateway module of FinanceApp. Confirm if you want to proceed with this change.');
//         cy.get('button').contains('Yes').click();
//       });

//     //Enter commit btn to save all the changes 
//     cy.get('.commit-btn').contains('Commit').click()
//   });
// });




//To handle all the scenarios of Rigel with dynamic values
describe('Dynamic Rigel Workflow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); // Wait after visiting the page for UI to load
  });

  it('Dynamically handles app, module, config, and parameters', () => {
    // Step 1: Dynamically select an App from the dropdown
    cy.get('#app').should('be.visible').click();
    cy.wait(1000); // Wait after clicking the app dropdown
    cy.get('.ng-dropdown-panel .ng-option')
      .first()
      .invoke('text')
      .then((app) => {
        cy.get('#app').click();
        cy.wait(500); // Wait before selecting the option
        cy.get('.ng-dropdown-panel .ng-option').contains(app.trim()).click();
      });
    cy.wait(1000); // Wait after selecting an app

    // Step 2: Dynamically select a Module
    cy.get('#module').should('be.visible').click();
    cy.wait(1000); // Wait after clicking the module dropdown
    cy.get('.ng-dropdown-panel .ng-option')
      .first()
      .invoke('text')
      .then((module) => {
        cy.get('#module').click();
        cy.wait(500); // Wait before selecting the option
        cy.get('.ng-dropdown-panel .ng-option').contains(module.trim()).click();
      });
    cy.wait(1000); // Wait after selecting a module

    // Step 3: Dynamically select a Config
    cy.get('#config').should('be.visible').click();
    cy.wait(1000); // Wait after clicking the config dropdown
    cy.get('.ng-dropdown-panel .ng-option')
      .first()
      .invoke('text')
      .then((config) => {
        cy.get('#config').click();
        cy.wait(500); // Wait before selecting the option
        cy.get('.ng-dropdown-panel .ng-option').contains(config.trim()).click();
      });
    cy.wait(1000); // Wait after selecting a config

    // Step 4: Dynamically fetch and handle configuration parameters
    cy.get('[id$="-config-parameter"]').each(($parameter) => {
      const parameterId = $parameter.attr('id');
      const parameterName = parameterId?.replace('-config-parameter', '');

      // Hover and click edit icon
      cy.wrap($parameter)
        .trigger('mouseover');
      cy.wait(500); // Wait after hovering over the parameter
      cy.wrap($parameter)
        .parent()
        .find('.edit-icon')
        .click();
      cy.wait(1000); // Wait after clicking the edit icon

      // Identify input type dynamically
      cy.wrap($parameter).parent().within(() => {
        cy.get('[id$="-value"]').then(($input) => {
          if ($input && $input.find('input[type="checkbox"]').length > 0) {
            // Handle boolean (checkbox)
            cy.wrap($input)
              .find('input[type="checkbox"]')
              .click({ force: true });
            cy.wait(1000); // Wait after clicking the checkbox
          } else if ($input && $input.find('input').length > 0 && !$input.find('.ng-select').length) {
            // Handle number input types (int or float)
            const inputValue = $input.find('input').val();
            const isFloat = inputValue && String(inputValue).includes('.'); // Check if the value contains a decimal point
            const valueToType = isFloat ? '51.5' : '31'; // Float or integer value dynamically
            const higherValue = isFloat ? '100.5' : '130';

            cy.wrap($input).find('input').clear().type(higherValue).blur();
            cy.wait(1000); // Wait after typing the higher value

            // Check for error-text and handle validation
            cy.document().then((doc) => {
              const errorElement = doc.querySelector('.error-text');
              if (errorElement) {
                cy.wrap($input).find('input').clear().blur(); // Leave input empty to trigger error
                cy.wait(1000); // Wait after clearing the input
                cy.get('.error-text').should('exist');
                cy.wrap($input).find('input').type(valueToType).blur();
                cy.wait(1000); // Wait after typing the valid value
              } else {
                cy.wrap($input).find('input').clear().type(higherValue).blur();
                cy.wait(1000); // Wait after re-typing the higher value
              }
            });
          } else if ($input && $input.find('.ng-select').length > 0) {
            // Handle dropdown (enum)
            cy.wrap($input)
              .find('.ng-select')
              .click();
            cy.wait(500); // Wait after clicking the dropdown
            cy.get('.ng-dropdown-panel .ng-option')
              .eq(1) // Select the second option dynamically
              .click();
            cy.wait(1000); // Wait after selecting the dropdown option
          } else {
            cy.log('Unknown input type for parameter:', parameterName);
          }
        });

        // Approve the change
        cy.get('.approve-icon')
          .should('be.visible')
          .click({ force: true });
        cy.wait(1000); // Wait after approving the change
      });

      // Handle the modal dialog dynamically
      cy.get('#staticBackdrop').should('be.visible').within(() => {
        cy.get('#staticBackdropLabel').should('contain.text', parameterName);
        cy.wait(500); // Wait before extracting the modal text
        cy.get('.modal-body')
          .invoke('text')
          .then((modalBodyText) => {
            expect(modalBodyText.trim().length).to.be.greaterThan(0);
            cy.get('button').contains('Yes').click();
            cy.wait(1000); // Wait after clicking Yes
          });
      });
    });

    // Commit all changes
    cy.get('.commit-btn').contains('Commit').click();
    cy.wait(2000); // Wait after committing the changes
  });
});
