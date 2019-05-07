import {Component, OnInit} from '@angular/core';
import {FormState} from '@app/users/users.service';
import {DataTypes, Device} from '@app/models/device';
import {LazyLoadEvent} from 'primeng/api';
import {User, UserType} from '@app/models/user';
import {DeviceService} from '@app/devices/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  devices: Device[];
  dataTypes: string[] = Object.keys(DataTypes);
  deviceForm: Device = new Device();
  formState: FormState = FormState.New;
  FormStates = FormState;
  loading: boolean;
  display = false;

  constructor(private deviceService: DeviceService) {
    this.dataTypes = this.dataTypes.slice(this.dataTypes.length / 2);
  }

  ngOnInit() {
  }

  showDialog(device?: Device) {
    this.display = true;
    if (device) {
      this.formState = FormState.Edit;
      this.deviceForm = device;
    } else {
      this.formState = FormState.New;
      this.deviceForm = new Device();
    }
  }

  loadDevices($event: LazyLoadEvent) {
    this.loading = true;
    this.deviceService.AllDevice().subscribe(devices => {
      this.loading = false;
      this.devices = devices;
    });
  }

  deleteDevice(device: Device) {
    this.deviceService.deleteDevice(device).subscribe(result => {
      const index = this.devices.indexOf(device, 0);
      if (index > -1) {
        this.devices.splice(index, 1);
      }
    });
  }

  onSubmit() {
    this.deviceService.updateDevice(this.deviceForm, this.formState).subscribe(result => {
      if (this.formState === FormState.New) {
        this.devices.push(this.deviceForm);
      }
      this.display = false;
    });
  }
}
