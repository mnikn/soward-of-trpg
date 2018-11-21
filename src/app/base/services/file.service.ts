import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare const electron: any;
const fs = electron.remote.require('fs');
const ipc = electron.ipcRenderer;


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  public writeFile(path: string, data: any): Observable<boolean> {
    return new Observable((observer) => {
      fs.writeFile(path, data, 'utf8', () => {
        observer.next(true);
        observer.complete();
      });
    });
  }

  public deleteFile(path: string): Observable<boolean> {
    return new Observable((observer) => {
      fs.unlink(path, () => {
        observer.next(true);
        observer.complete();
      });
    });
  }

  public readFile(path: string): Observable<any> {
    return new Observable((observer) => {
      fs.readFile(path, 'utf8', (e, data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  public readFileSync(path: string): any {
    return fs.readFileSync(path, 'utf8');
  }

  public showFileDialog(): Observable<string> {
    return new Observable<string>(observer => {
      ipc.send('save-dialog');
      ipc.on('saved-file', function (event, path) {
        observer.next(path);
      });
    });
  }
}
