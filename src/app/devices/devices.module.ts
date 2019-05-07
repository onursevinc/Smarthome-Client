import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DevicesComponent} from '@app/devices/devices.component';
import {DevicesRoutingModule} from '@app/devices/devices-routing.module';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule, InputSwitchModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DevicesRoutingModule,
    InputSwitchModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    TableModule
  ]
})
export class DevicesModule { }
