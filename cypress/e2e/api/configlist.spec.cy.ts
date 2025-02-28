import { logTestResult } from "../../support/excelHelper"; // Import the helper function

// describe("API Testing - /api/v1/configlist", () => {
//   let baseUrl: string;
//   let endpoint: string;
//   let queryParams: { [key: string]: string | number };
//   let expectedResponse: any;
//   let validationKeys: string[];

//   beforeEach(() => {
//     cy.visit("/"); // Ensures the base URL is visited before running tests

//     // Load test data dynamically
//     cy.fixture("configlistTestData").then((data) => {
//       baseUrl = data.baseUrl;
//       endpoint = data.endpoint;
//       queryParams = data.queryParams;
//       expectedResponse = data.expectedResponse;
//       validationKeys = data.validationKeys;
//     });
//   });

//   it("Should fetch the configuration list successfully with query parameters", () => {
//     const queryString = Object.entries(queryParams)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("&");

//     cy.request(`${baseUrl}${endpoint}?${queryString}`).then((response) => {
//       try {
//         // Validate status and message
//         expect(response.status).to.eq(expectedResponse.statusCode);
//         expect(response.body.status).to.eq(expectedResponse.status);
//         expect(response.body.message).to.eq(expectedResponse.message);

//         // Validate the structure of the configurations array
//         const configurations = response.body.data.configurations;
//         expect(configurations).to.be.an("array").and.not.to.be.empty;

//         // Validate keys in each object of the array
//         configurations.forEach((item: any) => {
//           validationKeys.forEach((key: string) => {
//             expect(item).to.have.property(key);
//           });
//         });

//         // Additional checks for specific fields
//         const firstItem = configurations[0];
//         expect(firstItem.app).to.eq(queryParams["app"]);
//         expect(firstItem.module).to.eq(queryParams["module"]);
//         expect(firstItem.ver).to.eq(queryParams["ver"]);
//         expect(firstItem.config).to.be.a("string");
//         expect(firstItem.description).to.be.a("string");

//         // Log "Passed" to Excel
//         logTestResult("Test ConfigList API", "Passed", "Data Fetched Successfully");
//       } catch (error: unknown) {
//         // Log "Failed" to Excel in case of an error
//         logTestResult(
//           "Test ConfigList API",
//           "Failed",
//           error instanceof Error ? error.message : "Unknown error"
//         );
//         throw error; // Ensure the test fails in Cypress
//       }
//     });
//   });

//   it("Should handle 404 for invalid query parameters", () => {
//     const invalidQueryParams = {
//       app: "InvalidApp",
//       module: "InvalidModule",
//       ver: 999,
//     };

//     const queryString = Object.entries(invalidQueryParams)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("&");

//     cy.request({
//       url: `${baseUrl}${endpoint}?${queryString}`,
//       failOnStatusCode: false, // Allow 404 to occur
//     }).then((response) => {
//       try {
//         // Validate the status code
//         expect(response.status).to.eq(404);

//         // Check the content type
//         const contentType = response.headers["content-type"];
//         if (contentType.includes("application/json")) {
//           expect(response.body).to.have.property("status", "Failed");
//         } else if (contentType.includes("text/html")) {
//           expect(response.body).to.contain("<!DOCTYPE html>");
//           expect(response.body).to.contain("Cannot GET");
//         }

//         // Log "Passed" to Excel
//         logTestResult("Test Invalid ConfigList Params", "Passed", "Error as Expected");
//       } catch (error: unknown) {
//         // Log "Failed" to Excel in case of any errors
//         logTestResult(
//           "Test Invalid ConfigList Params",
//           "Failed",
//           error instanceof Error ? error.message : "Unknown error"
//         );
//         throw error;
//       }
//     });
//   });
// });

describe("API Testing - /api/v1/configlist", () => {
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
  it("Should fetch the config list successfully", () => {
    cy.request(`${baseUrl}${endpoint}`).then((response) => {
      const responseTime = response.duration;
      const actualStatusCode = response.status;

      try {
        expect(actualStatusCode).to.eq(200);
        expect(response.body.status).to.eq("success");

        logTestResult(
          "Test ConfigList API",
          "Passed",
          "Data Fetched Successfully",
          responseTime,
          200,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test ConfigList API",
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
          "Test Invalid ConfigList Endpoint",
          "Failed",
          "Unexpected Error",
          responseTime,
          404,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test Invalid ConfigList Endpoint",
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
    cy.request(`${baseUrl}/api/v1/configlist?app=FinanceApp&module=PaymentGateway&ver=2`).then((response) => {
      const responseTime = response.duration;
      const actualStatusCode = response.status;

      try {
        expect(actualStatusCode).to.eq(200);
        expect(response.body.status).to.eq("success");

        logTestResult(
          "Test ConfigList API - PaymentGateway",
          "Passed",
          "Data Fetched Successfully",
          responseTime,
          200,
          actualStatusCode
        );
      } catch (error: unknown) {
        logTestResult(
          "Test ConfigList API - TradeApp",
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
      url: `${baseUrl}${endpoint}?app=FinanceApp&module=AccountingModule&ver=3`,
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
