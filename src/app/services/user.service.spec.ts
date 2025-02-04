import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to mock HTTP requests
      providers: [UserService], // Provide the actual UserService
    });
    service = TestBed.inject(UserService); // Inject the service to test
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController to mock HTTP requests
  });

  it('should handle errors gracefully', () => {
    const errorMessage = 'Failed to load user data';

    // Act: Call the service method which triggers an HTTP request
    service.getUser().subscribe(
      () => fail('expected an error, not user data'), // This should fail if the response is successful
      (error: HttpErrorResponse) => {
        // Assert: Check if the error contains the expected properties
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
        expect(error.error).toBe(errorMessage);  // Check the 'error' property which contains the message
        expect(error.message).toContain('Http failure response');  // Check the message for HTTP error
      }
    );

    // Simulate a mock HTTP request and respond with an error
    const req = httpMock.expectOne('/api/user');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });

    // Verify that no other requests are pending
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests after each test
  });
});
