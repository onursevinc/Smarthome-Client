import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {HomeModule} from './home/home.module';
import {ShellModule} from './shell/shell.module';
import {LoginModule} from './login/login.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {jwtOptionsFactory} from '@app/core/authentication/jwtOptionsFactory';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useClass: jwtOptionsFactory
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    LoginModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
