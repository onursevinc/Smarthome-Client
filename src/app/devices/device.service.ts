import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormState} from '@app/users/users.service';
import {Device} from '@app/models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) {
  }

  AllDevice(): Observable<Device[]> {
    return this.http.get <Device[]>('/devices');
  }

  updateDevice(device: Device, state: FormState): Observable<Device> {
    return this.http[state === FormState.New ? 'post' : 'put']<Device>('/devices', device);
  }

  deleteDevice(device: Device): Observable<any> {
    return this.http.delete<Device>(`/devices/${device._id}`);
  }
}
