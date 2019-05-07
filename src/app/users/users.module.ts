import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import {UsersRoutingModule} from '@app/users/users-routing.module';
import {UsersComponent} from '@app/users/users.component';
import {TableModule} from 'primeng/table';


import {MustMatchDirective} from './must-match.directive';
import {ButtonModule, DialogModule, DropdownModule} from 'primeng/primeng';

@NgModule({
  declarations: [UsersComponent, MustMatchDirective],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    UsersRoutingModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    TableModule
  ]
})
export class UsersModule {
}
