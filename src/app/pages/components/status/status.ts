import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusEntry } from '../../../shared/interfaces/ApiStatus';
import { DataGet } from '../../../shared/services/data-get.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-status',
  imports: [CommonModule],
  providers: [DataGet],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class Status {
  statusHistory: StatusEntry[] = [];

  constructor(private route: ActivatedRoute) {
    const data = this.route.snapshot.data['status'];
    this.statusHistory = data?.statusHistory?.slice().reverse() || [];
  }
}
