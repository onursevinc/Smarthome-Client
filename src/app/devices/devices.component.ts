import {Component, OnInit} from '@angular/core';
import {FormState} from '@app/users/users.service';
import {DataTypes, Device} from '@app/models/device';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {DeviceService} from '@app/devices/device.service';
import {FormGroup} from '@angular/forms';

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

  constructor(private deviceService: DeviceService, private confirmationService: ConfirmationService) {
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
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deviceService.deleteDevice(device).subscribe(result => {
          const index = this.devices.indexOf(device, 0);
          if (index > -1) {
            this.devices.splice(index, 1);
          }
        });
      },
      reject: () => {

      }
    });
  }

  onSubmit(f: FormGroup) {
    this.deviceService.updateDevice(this.deviceForm, this.formState).subscribe(result => {
      if (this.formState === FormState.New) {
        this.devices.push(result);
      }
      f.reset();
      this.display = false;
    });
  }
}
