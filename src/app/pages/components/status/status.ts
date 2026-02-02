import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusEntry } from '../../../shared/interfaces/ApiStatus';
import { DataGet } from '../../../shared/services/data-get.service';

@Component({
  selector: 'app-status',
  imports: [CommonModule],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class Status {
  statusHistory: StatusEntry[] = [];

  constructor(private statusService: DataGet) {}

  ngOnInit(): void {
    this.statusService.getStatusHistory().subscribe(
      (res) => {
        if (res && Array.isArray(res.statusHistory)) {
          this.statusHistory = res.statusHistory.slice().reverse();
        } else {
          this.statusHistory = [];
        }
      },
      (err) => {
        console.error('Error fetching status history:', err);
        this.statusHistory = [];
      },
    );
  }
}
