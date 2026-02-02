import { Component } from '@angular/core';
import { UserEntry } from '../../../shared/interfaces/user.interface';
import { DataGet } from '../../../shared/services/data-get.service';

@Component({
  selector: 'app-volunteers',
  imports: [],
  templateUrl: './volunteers.html',
  styleUrl: './volunteers.css',
})
export class Volunteers {
  users: UserEntry[] = [];
  loading = true;

  constructor(private userService: DataGet) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users || [];
        this.loading = false;
      },
      error: () => {
        this.users = [];
        this.loading = false;
      },
    });
  }
}
