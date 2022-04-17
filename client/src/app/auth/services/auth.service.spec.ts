import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { BASE_URL } from 'src/app/shared/constants';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Token } from 'src/app/shared/models/token';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let mockUserService: jasmine.SpyObj<UserService>;

  const user: User = {
    _id: 'some id',
    email: 'some email',
    password: 'some password',
    firstName: 'some name',
    lastName: 'some last name',
    dob: 'some dob',
    gender: 'male',
    role: 'admin',
    country: 'usa',
  };

  const token: Token = {
    token: 'some token',
    expiresIn: '10000',
    user: user,
  };

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj('UserService', ['setUser']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
      ],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should succesfully save token', () => {
    spyOn(localStorage, 'setItem');

    service.saveToken(token);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('should call saveToken and userservice.setUser on succesfull login', (done: DoneFn) => {
    spyOn(service, 'saveToken');

    service.login('test@gmail.com', 'test').subscribe(() => {
      expect(service.saveToken).toHaveBeenCalledOnceWith(token);
      expect(mockUserService.setUser).toHaveBeenCalledOnceWith(user);
      done();
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${BASE_URL}/users/login`,
    });
    req.flush(token);
  });

  it('should not call saveToken and userservice.setUser  on error', (done: DoneFn) => {
    spyOn(service, 'saveToken');
    service.login('test@gmail.com', 'test').subscribe({
      error: () => {
        expect(service.saveToken).not.toHaveBeenCalled();
        expect(mockUserService.setUser).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${BASE_URL}/users/login`,
    });
    req.error(new ProgressEvent('401'));
  });

  it('should succesfully log out', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('expiresAt');
    expect(mockUserService.setUser).toHaveBeenCalledWith(null);
  });
});
