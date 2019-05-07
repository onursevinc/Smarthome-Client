import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';

import * as $ from 'jquery';
import {DevicesService} from '@app/core/services/devices.service';
import {DataTypes, Device, DeviceDataType} from '@app/models/device';
import {SocketService} from '@app/core/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  devices: Array<Device> = [];
  isLoading: boolean;
  socketConnected = false;

  constructor(private devicesService: DevicesService, private socketService: SocketService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.devicesService.getAllDevice()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((result: any) => {
        if (typeof result !== 'string') {
          this.devices = result;
          $('.btn-switch').on('click', function () {
            $(this).toggleClass('on');
          });
        }
      });

    this.socketService.isConnected.subscribe(c => this.socketConnected = c);

    this.socketService.listen('device').subscribe((msg: any) => {
      console.log('listenDevice', msg);
    });

    this.socketService.listen('status').subscribe((msg: any) => {
      console.log('listenstatus', msg);
      this.devices.map(device => {
        if (device.token === msg.token) {
          if (msg.event === 'disconnect') {
            device.status = false;
          }
          if (msg.event === 'connect') {
            device.status = true;
          }
          if (msg.event === 'status') {
            device.status = true;
          }
          device.data = msg.data;
        }
      });
    });
    this.socketService.send('connect', <Device>{token: 'asd', data: {type: DataTypes.Number, value: 1}});
    this.socketService.listen('connect').subscribe((msg: any) => {
      console.log('connect', msg);
    });
  }

  ngOnDestroy(): void {
    this.socketService.disConnect();
  }

  deviceClick(device: Device) {
    device.data.value = (device.data.value) ? 0 : 1;
    if (this.socketConnected) {
      this.socketService.send('device', device);
    } else {
      this.devicesService.updateDevice(device)
        .subscribe((result: Device) => {
          device.data.value = result.data.value;
        });
    }
  }
}
