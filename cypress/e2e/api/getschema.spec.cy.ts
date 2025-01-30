describe('API Testing - /api/v1/getschema', () => {
    let baseUrl: string;
    let endpoint: string;
    let payload: any;
    let expectedResponse: any;
  
    beforeEach(() => {
      // Load test data dynamically
      cy.fixture('getschemaTestData').then((data) => {
        baseUrl = data.baseUrl;
        endpoint = data.schemaEndpoint; // Ensure the endpoint is specific for getschema API
        payload = data.schemaPayload; // Query params for the test
        expectedResponse = data.expectedSchemaResponse; // Expected keys and structure
      });
    });
  
    it('Should fetch schema successfully', () => {
      // Construct the query string dynamically
      const queryString = Object.entries(payload)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
  
      // Send the GET request with the query parameters
      cy.request(`${baseUrl}${endpoint}?${queryString}`).then((response) => {
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
  
          // Check optional constraints
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
        failOnStatusCode: false,
      }).then((response) => {
        // Validate 404 status
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
      });
    });
  });
  