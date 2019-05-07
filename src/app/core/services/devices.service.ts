import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Device} from '@app/models/device';

@Injectable()
export class DevicesService {

  constructor(private http: HttpClient) {
  }

  getAllDevice(): Observable<Device[]> {
    return this.http.get<Device[]>('/devices');
  }

  updateDevice(device: Device): Observable<Device | string> {
    return this.http.put<Device>(`/devices/${device._id}`, device);
  }
}
