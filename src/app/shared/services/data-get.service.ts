import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Scan } from '../interfaces/scan.interface';
import { ApiStatus } from '../interfaces/ApiStatus';
import { UserList } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class DataGet {
  private sheetLink =
    'https://script.google.com/macros/s/AKfycbz3vfgJoSLgqUGnnW93j-1m1v3uip3Yh4PAFtl0NlxjZS6A0VFyNEA-BcKUTNHrxF6R/exec';
  constructor(private http: HttpClient) {}
  getData(): Observable<Scan> {
    return this.http.get<Scan>(this.sheetLink);
  }

  private apiUrl =
    'https://script.google.com/macros/s/AKfycbwCiPmfBcjms0qKgGoPfdWHaZsuyOaU5TDsFc20ccbnhixm4SxWVMzx_0HW4Wi_9cWxLw/exec';

  getStatusHistory(): Observable<ApiStatus> {
    return this.http.get<ApiStatus>(this.apiUrl);
  }

  private apiUrls =
    'https://script.google.com/macros/s/AKfycbyzyT7zKxwIT31E6aL16ewnJLvjubiP-tZi0bXx1HewdzPiBNyp1sCYt2oMfOfLBZHCOg/exec';

  getUsers(): Observable<UserList> {
    return this.http.get<UserList>(this.apiUrls);
  }
}
