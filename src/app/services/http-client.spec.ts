import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('HttpClient', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should make a GET request', () => {
    http.get('/data').subscribe(response => {
      expect(response).toEqual({ message: 'success' });
    });

    const req = httpMock.expectOne('/data');
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'success' });
  });
});
