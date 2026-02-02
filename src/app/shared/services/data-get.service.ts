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
    'https://script.google.com/macros/s/AKfycbwifGmJZ_aa51i3xjPuKi6utKRPKpLhQNaesZt92hq2aG8IyFF-p1WcI5dD7_Vjmfv6/exec';
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
    'https://script.google.com/macros/s/AKfycbymrhSCwAvvY382sNmvrdE4A-vHuVeDxMp_cCpQKcXq1BcutKIf5g_eSkwbAZl2NL8-Yg/exec';

  getUsers(): Observable<UserList> {
    return this.http.get<UserList>(this.apiUrls);
  }
}
