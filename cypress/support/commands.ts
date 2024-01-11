// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    selectValueFromDropdown(selector:string, value:string): typeof selectValueFromDropdown;
  }
}
//
// function customCommand(param: any): void {
//   console.warn(param);
// }

function selectValueFromDropdown(selector:string, value:string):void {
    cy.get(selector)
      .click()
      .get("ng-dropdown-panel")
      .get(".ng-option")
      .contains(value)
      .then((item) => {
        cy.wrap(item).click();
      });
  }

// function getSchemaList(){
//     cy.request("GET", "http://localhost:3000/userList").then((response) => {
//       interface UserResponse {
//         id: string;
//         username: string;
//         email: string;
//       }

//       // Verify status code
//       expect(response.status).to.eq(200, "Invalid status code");

//       // Verify response body structure
//       expect(response.body).to.be.an("array", "Invalid response body");
//       expect(response.body).to.have.length.above(0, "Response body is empty");

//       // Loop through each object in the array
//       response.body.forEach((item: UserResponse) => {
//         // Verify the properties of each object
//         expect(item).to.have.property("id", "Invalid property 'id' value");
//         expect(item).to.have.property("username", "Invalid property 'username' value");
//         expect(item).to.have.property("email", "Invalid property 'email' value");
      
//         // Verify specific field values
//         expect(item.id).to.be.a("number", "Invalid 'id' data type");
//         expect(item.username).to.be.a("string", "Invalid 'username' data type");
//         expect(item.email).to.be.a("string", "Invalid 'email' data type");
//       });
//     });
// }
//
// NOTE: You can use it like so:
Cypress.Commands.add('selectValueFromDropdown', selectValueFromDropdown);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
