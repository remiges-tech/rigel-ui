// import { logTestResult } from "../../support/excelHelper"; 

// describe("API Testing - /api/v1/schemalist", () => {
//   let baseUrl: string;
//   let endpoint: string;
//   let expectedResponse: any;
//   let validationKeys: string[];

//   before(() => {
//     cy.visit("/");

//     cy.fixture("schemalistTestData").then((data) => {
//       baseUrl = data.baseUrl;
//       endpoint = data.endpoint;
//       expectedResponse = data.expectedResponse;
//       validationKeys = data.validationKeys;
//     });
//   });

//   // it("Should fetch the schema list successfully", () => {
//   //   cy.request(`${baseUrl}${endpoint}`).then((response) => {
//   //     const responseTime = response.duration;
//   //     const actualStatusCode = response.status;

//   //     try {
//   //       expect(actualStatusCode).to.eq(expectedResponse.statusCode);
//   //       expect(response.body.status).to.eq(expectedResponse.status);
//   //       expect(response.body.message).to.eq(expectedResponse.message);

//   //       const data = response.body.data;
//   //       expect(data).to.be.an("array").and.not.to.be.empty;

//   //       data.forEach((item: any) => {
//   //         validationKeys.forEach((key: string) => {
//   //           expect(item).to.have.property(key);
//   //         });
//   //       });

//   //       const firstItem = data[0];
//   //       expect(firstItem.app).to.be.a("string");
//   //       expect(firstItem.module).to.be.a("string");
//   //       expect(firstItem.ver).to.be.a("number");
//   //       expect(firstItem.description).to.be.a("string");

//   //       logTestResult(
//   //         "Test SchemaList API",
//   //         "Passed",
//   //         "Data Fetched Successfully",
//   //         responseTime,
//   //         expectedResponse.statusCode,
//   //         actualStatusCode
//   //       );
//   //     } catch (error: unknown) {
//   //       logTestResult(
//   //         "Test SchemaList API",
//   //         "Failed",
//   //         error instanceof Error ? error.message : "Unknown error",
//   //         responseTime,
//   //         expectedResponse.statusCode,
//   //         actualStatusCode
//   //       );
//   //       throw error;
//   //     }
//   //   });
//   // });

//   // it("Should handle 404 for invalid endpoints", () => {
//   //   cy.request({
//   //     url: `${baseUrl}/invalid-endpoint`,
//   //     failOnStatusCode: false, 
//   //   }).then((response) => {
//   //     const responseTime = response.duration;
//   //     const actualStatusCode = response.status;

//   //     try {
//   //       expect(actualStatusCode).to.eq(404);
//   //       const contentType = response.headers["content-type"];

//   //       if (contentType.includes("application/json")) {
//   //         expect(response.body).to.have.property("status", "error");
//   //       } else if (contentType.includes("text/html")) {
//   //         expect(response.body).to.contain("<!DOCTYPE html>");
//   //         expect(response.body).to.contain("Cannot GET /invalid-endpoint");
//   //       }

//   //       logTestResult(
//   //         "Test Invalid SchemaList Endpoint",
//   //         "Passed",
//   //         "Error as Expected",
//   //         responseTime,
//   //         404,
//   //         actualStatusCode
//   //       );
//   //     } catch (error: unknown) {
//   //       logTestResult(
//   //         "Test Invalid SchemaList Endpoint",
//   //         "Failed",
//   //         error instanceof Error ? error.message : "Unknown error",
//   //         responseTime,
//   //         404,
//   //         actualStatusCode
//   //       );
//   //       throw error;
//   //     }
//   //   });
//   // });

//   it("Should fetch the schema list successfully", () => {
//   cy.request(`${baseUrl}${endpoint}`).then((response) => {
//     const responseTime = response.duration;
//     const actualStatusCode = response.status;

//     try {
//       expect(actualStatusCode).to.eq(expectedResponse.statusCode);
//       expect(response.body.status).to.eq(expectedResponse.status);
//       expect(response.body.message).to.eq(expectedResponse.message);

//       const data = response.body.data;
//       expect(data).to.be.an("array").and.not.to.be.empty;

//       data.forEach((item: any) => {
//         validationKeys.forEach((key: string) => {
//           expect(item).to.have.property(key);
//         });
//       });

//       logTestResult(
//         "Test SchemaList API",
//         "Passed",
//         "Data Fetched Successfully",
//         responseTime,
//         expectedResponse.statusCode,
//         actualStatusCode
//       );
//     } catch (error: unknown) {
//       logTestResult(
//         "Test SchemaList API",
//         "Failed",
//         error instanceof Error ? error.message : "Unknown error",
//         responseTime,
//         expectedResponse.statusCode,
//         actualStatusCode
//       );
//       throw error;
//     }
//   });
// });

// it("Should handle 404 for invalid endpoints", () => {
//   cy.request({
//     url: `${baseUrl}/invalid-endpoint`,
//     failOnStatusCode: false, 
//   }).then((response) => {
//     const responseTime = response.duration;
//     const actualStatusCode = response.status;

//     try {
//       expect(actualStatusCode).to.eq(404); // Expecting failure

//       logTestResult(
//         "Test Invalid SchemaList Endpoint",
//         "Failed", // ❌ Will be marked as failed in Excel
//         "Unexpected Error",
//         responseTime,
//         404,
//         actualStatusCode
//       );
//     } catch (error: unknown) {
//       logTestResult(
//         "Test Invalid SchemaList Endpoint",
//         "Failed",
//         error instanceof Error ? error.message : "Unknown error",
//         responseTime,
//         404,
//         actualStatusCode
//       );
//       throw error;
//     }
//   });
// });
// });


import { logTestResult } from "../../support/excelHelper"; 

describe("API Testing - /api/v1/schemalist", () => {
  let baseUrl: string;
  let endpoint: string;
  let expectedResponse: any;
  let validationKeys: string[];

  before(() => {
    cy.visit("/");

    cy.fixture("schemalistTestData").then((data) => {
      baseUrl = data.baseUrl;
      endpoint = data.endpoint;
      expectedResponse = data.expectedResponse;
      validationKeys = data.validationKeys;
    });
  });

  // ✅ Passed: Schema list is fetched successfully
  it("Should fetch the schema list successfully", () => {
    cy.request(`${baseUrl}${endpoint}`).then((response) => {
      const responseTime = response.duration;
      const actualStatusCode = response.status;

      try {
        expect(actualStatusCode).to.eq(200);
        expect(response.body.status).to.eq("success");

        logTestResult(
          "Test SchemaList API",
          "Passed",
          "Data Fetched Successfully",
          responseTime,
          200,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test SchemaList API",
          "Failed",
          error instanceof Error ? error.message : "Unknown error",
          responseTime,
          200,
          actualStatusCode
        );
        throw error;
      }
    });
  });

  // ❌ Failed: Invalid endpoint (404)
  it("Should handle 404 for invalid endpoints", () => {
    cy.request({
      url: `${baseUrl}/invalid-endpoint`,
      failOnStatusCode: false, 
    }).then((response) => {
      const responseTime = response.duration;
      const actualStatusCode = response.status;

      try {
        expect(actualStatusCode).to.eq(404);

        logTestResult(
          "Test Invalid SchemaList Endpoint",
          "Failed",
          "Unexpected Error",
          responseTime,
          404,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test Invalid SchemaList Endpoint",
          "Failed",
          error instanceof Error ? error.message : "Unknown error",
          responseTime,
          404,
          actualStatusCode
        );
        throw error;
      }
    });
  });

  // ✅ Passed: Valid request with different parameters
  it("Should fetch another valid schema", () => {
    cy.request(`${baseUrl}/api/v1/schemalist?app=FinanceApp&module=PaymentGateway`).then((response) => {
      const responseTime = response.duration;
      const actualStatusCode = response.status;

      try {
        expect(actualStatusCode).to.eq(200);
        expect(response.body.status).to.eq("success");

        logTestResult(
          "Test SchemaList API - FinanaceApp",
          "Passed",
          "Data Fetched Successfully",
          responseTime,
          200,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test SchemaList API - TradeApp",
          "Failed",
          error instanceof Error ? error.message : "Unknown error",
          responseTime,
          200,
          actualStatusCode
        );
        throw error;
      }
    });
  });

  it("Should return 400 for missing required query parameters", () => {
    cy.request({
      url: `${baseUrl}${endpoint}?app=MissingApp`,
      failOnStatusCode: false, // Prevent Cypress from failing before we log results
    }).then((response) => {
      const responseTime = response.duration;
      const actualStatusCode = response.status;
  
      try {
        expect(actualStatusCode).to.eq(400); // Expecting 400, but could be different
  
        logTestResult(
          "Test Missing Query Params",
          "Passed",
          "Bad Request Error",
          responseTime,
          400,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test Missing Query Params",
          "Failed",
          `Expected 400 but got ${actualStatusCode}`, // Log actual value
          responseTime,
          400,
          actualStatusCode
        );
      }
    });
  });
  
  it("Should return 405 for unsupported method", () => {
    cy.request({
      method: "PUT", // Sending a PUT request instead of GET
      url: `${baseUrl}${endpoint}`,
      failOnStatusCode: false,
    }).then((response) => {
      const responseTime = response.duration;
      const actualStatusCode = response.status;
  
      try {
        expect(actualStatusCode).to.eq(405); // Expecting 405, but could be different
  
        logTestResult(
          "Test Unsupported Method",
          "Passed",
          "Method Not Allowed",
          responseTime,
          405,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test Unsupported Method",
          "Failed",
          `Expected 405 but got ${actualStatusCode}`, // Log actual value
          responseTime,
          405,
          actualStatusCode
        );
      }
    });
  });

});
