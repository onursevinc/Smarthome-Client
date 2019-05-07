import {Injector, Injectable} from '@angular/core';
import {AuthenticationService} from "@app/core";

@Injectable()
export class jwtOptionsFactory {
  private authService: AuthenticationService;

  constructor(inj: Injector) {
    setTimeout(() => {
      this.authService = inj.get(AuthenticationService);
    });
  }

  public tokenGetter = () => {
    setTimeout(() => {
      return this.authService.accessToken();
    });
  }
}
