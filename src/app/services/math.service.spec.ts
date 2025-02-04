import { TestBed } from '@angular/core/testing';
import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly add numbers', () => {
    expect(service.add(2, 3)).toBe(5);
  });

  it('should correctly subtract numbers', () => {
    expect(service.subtract(5, 3)).toBe(2);
  });
});
