import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('UserComponent', () => {
  let component: UserComponent;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['getUser']);

    TestBed.configureTestingModule({
      imports: [UserComponent, HttpClientModule], // Move UserComponent here
      providers: [{ provide: UserService, useValue: spy }]
    });

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    component = TestBed.createComponent(UserComponent).componentInstance;
  });

  it('should display an empty name if no user data is available', () => {
    // @ts-ignore
    userService.getUser.and.returnValue(of(null)); // Simulate no user data
    component.ngOnInit();
    expect(component.user).toBeNull();
    // You might want to check the displayed name here in a more thorough test
  });

  it('should display the user name', () => {
    const userData = { name: 'John Doe' };
    userService.getUser.and.returnValue(of(userData)); // Simulate user data
    component.ngOnInit();
    expect(component.user).toEqual(userData);
  });
});
