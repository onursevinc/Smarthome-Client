import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Device} from '@app/models/device';
import {environment} from '@env/environment';
import Socket = SocketIOClient.Socket;
import {AuthenticationService} from '@app/core';

let self: SocketService = null;

@Injectable()
export class SocketService {
  isConnected: Subject<boolean> = new BehaviorSubject(<boolean>false);
  private socket: Socket;

  constructor(private auth: AuthenticationService) {
    self = this;
    this.socket = io(`${environment.socketUrl}?token=${this.auth.credentials.user._id}&type=${this.auth.credentials.user.type}`);
    this.isConnected = new BehaviorSubject(<boolean>false);
    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
  }

  send(channel: string, msg: Device) {
    this.socket.emit(channel, {
      token: msg.token,
      data: msg.data
    });
  }

  listen(channel: string) {
    return new Observable((observer) => {
      this.socket.on(channel, (message: any) => {
        observer.next(message);
      });
    });
  }

  disConnect(): void {
    this.socket.disconnect();
  }

  onConnect() {
    self.isConnected.next(true);
  }

  onDisconnect() {
    self.isConnected.next(false);
  }
}
