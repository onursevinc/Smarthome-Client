import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CREDENTIALS_KEY} from '@app/constants';
import {User} from '@app/models/user';

export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface Credentials {
  email: string;
  tokens: Tokens;
  user?: User;
}

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    const savedCredentials = sessionStorage.getItem(CREDENTIALS_KEY) || localStorage.getItem(CREDENTIALS_KEY);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.http.post<Credentials>('/auth/login', context)
      .pipe(
        map(result => {
          const data = {
            email: context.email,
            tokens: {accessToken: result.tokens.accessToken},
            user: result.user
          };

          this.setCredentials(data, context.remember);

          return result;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials && !this.jwtHelper.isTokenExpired(this._credentials.tokens.accessToken);
    // return this.http.post('/auth/validate', {'accessToken': this._credentials.tokens.accessToken});
    // return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  accessToken(): string | null {
    return this._credentials ? this._credentials.tokens.accessToken : null;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(CREDENTIALS_KEY);
      localStorage.removeItem(CREDENTIALS_KEY);
    }
  }

}
