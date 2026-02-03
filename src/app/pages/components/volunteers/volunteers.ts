import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserEntry } from '../../../shared/interfaces/user.interface';
import { DataGet } from '../../../shared/services/data-get.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volunteers',
  imports: [FormsModule],
  providers: [DataGet],
  templateUrl: './volunteers.html',
  styleUrl: './volunteers.css',
})
export class Volunteers {
  users: UserEntry[] = [];
  filteredUsers: UserEntry[] = [];
  loading = true;
  ready = false;
  searchTerm = ''; // new property for search

  private dataService = inject(DataGet);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.reload());
  }

  ngAfterViewInit(): void {
    this.reload();
  }

  ngOnDestroy(): void {
    // nothing to clean up
  }

  private reload() {
    this.loading = true;
    this.ready = false;

    this.dataService.getUsers().subscribe({
      next: (res) => this.processData(res.users || []),
      error: () => {
        this.loading = false;
        this.ready = false;
      },
    });
  }

  private processData(users: UserEntry[]) {
    this.users = users;
    this.applyFilter();
    this.loading = false;
    this.ready = true;
    this.cdr.detectChanges();
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter((u) => u.name.toLowerCase().includes(term));
  }
}
