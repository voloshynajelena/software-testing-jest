import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent], // Import the standalone CounterComponent
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ensure the component is rendered before interaction
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial count as 0', () => {
    const countElement = fixture.debugElement.nativeElement.querySelector('h1');
    expect(countElement.textContent).toContain('Counter: 0');
  });

  it('should increment the count when "+" button is clicked', () => {
    // Use `querySelector` to get the first button
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click(); // Simulate a click on the "+" button
    fixture.detectChanges(); // Trigger change detection to update the view

    expect(component.count).toBe(1); // Check that count has incremented
  });

  it('should decrement the count when "-" button is clicked', async () => {
    fixture.detectChanges();  // Ensure the DOM is fully rendered
    await fixture.whenStable(); // Wait for async tasks to complete

    // Get the decrement button and check if it exists
    const decrementButton = fixture.debugElement.nativeElement.querySelector('button:last-child');
    expect(decrementButton).not.toBeNull();  // Ensure button is rendered

    // Simulate click on "-" button
    decrementButton.click();

    fixture.detectChanges();  // Trigger change detection after the click

    const countElement = fixture.debugElement.nativeElement.querySelector('h1');
    expect(countElement.textContent).toContain('Counter: -1');
  });
});
