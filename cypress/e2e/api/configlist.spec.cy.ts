describe('API Testing - /api/v1/configlist', () => {
    let baseUrl: string;
    let endpoint: string;
    let queryParams: { [key: string]: string | number };
    let expectedResponse: any;
    let validationKeys: string[];
  
    beforeEach(() => {

      cy.visit('/');
      // Load test data dynamically
      cy.fixture('configlistTestData').then((data) => {
        baseUrl = data.baseUrl;
        endpoint = data.endpoint;
        queryParams = data.queryParams;
        expectedResponse = data.expectedResponse;
        validationKeys = data.validationKeys;
      });
    });
  
    it('Should fetch the configuration list successfully with query parameters', () => {
      // Construct query string from queryParams
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
  
      // Make the API request with query parameters
      cy.request(`${baseUrl}${endpoint}?${queryString}`).then((response) => {
        // Validate status and message
        expect(response.status).to.eq(expectedResponse.statusCode);
        expect(response.body.status).to.eq(expectedResponse.status);
        expect(response.body.message).to.eq(expectedResponse.message);
  
        // Validate the structure of the configurations array
        const configurations = response.body.data.configurations;
        expect(configurations).to.be.an('array').and.not.to.be.empty;
  
        // Validate keys in each object of the array
        configurations.forEach((item: any) => {
          validationKeys.forEach((key: string) => {
            expect(item).to.have.property(key);
          });
        });
  
        // Additional checks for specific fields
        const firstItem = configurations[0];
        expect(firstItem.app).to.eq(queryParams["app"]);
        expect(firstItem.module).to.eq(queryParams["module"]);
        expect(firstItem.ver).to.eq(queryParams["ver"]);
        expect(firstItem.config).to.be.a('string');
        expect(firstItem.description).to.be.a('string');
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
        failOnStatusCode: false, // Prevent Cypress from failing the test
      }).then((response) => {
        // Validate the status code
        expect(response.status).to.eq(404);
  
        // Check the content type
        const contentType = response.headers['content-type'];
        if (contentType.includes('application/json')) {
          // JSON response handling
          expect(response.body).to.have.property('status', 'Failed');
        } else if (contentType.includes('text/html')) {
          // HTML response handling
          expect(response.body).to.contain('<!DOCTYPE html>');
          expect(response.body).to.contain('Cannot GET');
        }
      });
    });
  });
  