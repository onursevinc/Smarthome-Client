import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '@app/models/user';
import {HttpClient} from '@angular/common/http';

export enum FormState {
  New = 'new',
  Edit = 'edit',
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  AllUsers(): Observable<User[]> {
    return this.http.get <User[]>('/users');
  }

  updateUser(user: User, state: FormState): Observable<User> {
    return this.http[state === FormState.New ? 'post' : 'put']<User>('/users', user);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete<User>(`/users/${user._id}`);
  }
}
