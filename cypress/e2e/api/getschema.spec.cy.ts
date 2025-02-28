import { logTestResult } from "excelHelper";

describe('API Testing - /api/v1/getschema', () => {
  let baseUrl: string;
  let endpoint: string;
  let payload: any;
  let expectedResponse: any;

  beforeEach(() => {
    cy.visit('/');
  
    // Load test data dynamically
    cy.fixture('getschemaTestData').then((data) => {
      baseUrl = data.baseUrl;
      endpoint = data.schemaEndpoint; // Ensure the endpoint is specific for getschema API
      payload = data.schemaPayload; // Query params for the test
      expectedResponse = data.expectedSchemaResponse; // Expected keys and structure
    });
  });

  it('Should fetch schema successfully', () => {
    const queryString = Object.entries(payload)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // Send the GET request with the query parameters
    cy.request(`${baseUrl}${endpoint}?${queryString}`).then((response) => {
      try {
        // Validate response status and message
        expect(response.status).to.eq(expectedResponse.statusCode);
        expect(response.body.status).to.eq(expectedResponse.status);
        expect(response.body.message).to.eq(expectedResponse.message);

        // Validate schema structure
        const schema = response.body.data;
        expect(schema).to.have.property('app', payload.app);
        expect(schema).to.have.property('module', payload.module);
        expect(schema).to.have.property('ver', payload.ver);
        expect(schema).to.have.property('fields').and.to.be.an('array').and.not.to.be.empty;

        // Validate each field's structure
        schema.fields.forEach((field: any) => {
          expect(field).to.have.property('name').and.to.be.a('string');
          expect(field).to.have.property('type').and.to.be.a('string');
          expect(field).to.have.property('description').and.to.be.a('string');
          expect(field).to.have.property('impactAlert').and.to.be.a('string');

          if (field.constraints) {
            expect(field.constraints).to.be.an('object');
            if (field.constraints.min !== undefined) {
              expect(field.constraints.min).to.be.a('number');
            }
            if (field.constraints.max !== undefined) {
              expect(field.constraints.max).to.be.a('number');
            }
            if (field.constraints.enum) {
              expect(field.constraints.enum).to.be.an('array');
            }
          }
        });

        // Validate description
        expect(schema).to.have.property('description').and.to.be.a('string');

        // Log "Passed" to Excel
        logTestResult("Test GetSchema API", "Passed", "Data Fetched Successfully");

      } catch (error: unknown) {
        if (error instanceof Error) {
          // Log "Failed" to Excel in case of any errors
          logTestResult("Test GetSchema API", "Failed", error.message);
        } else {
          // Handle case when error is not an instance of Error
          logTestResult("Test GetSchema API", "Failed", "Unknown error occurred");
        }
        throw error; // Rethrow the error after logging it
      }
    });
  });

  it('Should handle 404 for invalid query parameters', () => {
    const invalidQueryParams = {
      app: 'InvalidApp',
      module: 'InvalidModule',
      ver: 999,
    };

    const queryString = Object.entries(invalidQueryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    cy.request({
      url: `${baseUrl}${endpoint}?${queryString}`,
      failOnStatusCode: false,  // Allow 404 to occur
    }).then((response) => {
      try {
        // Validate response status
        expect(response.status).to.eq(200);

        // Validate the error response
        const contentType = response.headers['content-type'];
        if (contentType.includes('application/json')) {
          expect(response.body).to.have.property('status', 'Failed');
          expect(response.body).to.have.property('message');
        } else if (contentType.includes('text/html')) {
          expect(response.body).to.contain('<!DOCTYPE html>');
          expect(response.body).to.contain('Cannot GET');
        }

        // Log "Passed" to Excel
        logTestResult("Test Invalid Query Params", "Passed", "Error as Expected");

      } catch (error: unknown) {
        if (error instanceof Error) {
          // Log "Failed" to Excel in case of any errors
          logTestResult("Test Invalid Query Params", "Failed", error.message);
        } else {
          // Handle case when error is not an instance of Error
          logTestResult("Test Invalid Query Params", "Failed", "Unknown error occurred");
        }
        throw error; // Rethrow the error after logging it
      }
    });
  });
});
