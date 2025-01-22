describe('API Testing - /api/v1/schemalist', () => {
    let baseUrl: string;
    let endpoint: string;
    let expectedResponse: any;
    let validationKeys: string[];
  
    before(() => {
      cy.visit('/');
  
      // Load test data from fixture
      cy.fixture('schemalistTestData').then((data) => {
        baseUrl = data.baseUrl;
        endpoint = data.endpoint;
        expectedResponse = data.expectedResponse;
        validationKeys = data.validationKeys;
      });
    });
  
    it('Should fetch the schema list successfully', () => {
      // Make the API request
      cy.request(`${baseUrl}${endpoint}`).then((response) => {
        expect(response.status).to.eq(expectedResponse.statusCode);
        expect(response.body.status).to.eq(expectedResponse.status);
        expect(response.body.message).to.eq(expectedResponse.message);
  
        // Validate the structure of the data array
        const data = response.body.data;
        expect(data).to.be.an('array').and.not.to.be.empty;
  
        // Validate keys in each object of the array
        data.forEach((item: any) => {
          validationKeys.forEach((key: string) => {
            expect(item).to.have.property(key);
          });
        });
  
        // Additional checks for specific fields
        const firstItem = data[0];
        expect(firstItem.app).to.be.a('string');
        expect(firstItem.module).to.be.a('string');
        expect(firstItem.ver).to.be.a('number');
        expect(firstItem.description).to.be.a('string');
      });
    });
  
    it('Should handle 404 for invalid endpoints', () => {
      cy.request({
        url: `${baseUrl}/invalid-endpoint`,
        failOnStatusCode: false, // Prevent Cypress from failing the test
      }).then((response) => {
        // Validate the status code
        expect(response.status).to.eq(404);
  
        // Check the content type
        const contentType = response.headers['content-type'];
        if (contentType.includes('application/json')) {
          // JSON response handling
          expect(response.body).to.have.property('status', 'error');
        } else if (contentType.includes('text/html')) {
          // HTML response handling
          expect(response.body).to.contain('<!DOCTYPE html>');
          expect(response.body).to.contain('Cannot GET /invalid-endpoint');
        }
      });
    });
  });
  