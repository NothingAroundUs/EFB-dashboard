import { Component } from '@angular/core';
import { UserEntry } from '../../../shared/interfaces/user.interface';
import { DataGet } from '../../../shared/services/data-get.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-volunteers',
  imports: [],
  providers: [DataGet],
  templateUrl: './volunteers.html',
  styleUrl: './volunteers.css',
})
export class Volunteers {
  users: UserEntry[] = [];
  loading = true;

  constructor(private route: ActivatedRoute) {
    const data = this.route.snapshot.data['users'];
    this.users = data?.users || [];
    this.loading = false;
  }
}
