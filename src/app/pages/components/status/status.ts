import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
  loading = true;
  ready = false;
  statusHistory: StatusEntry[] = [];

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

    this.dataService.getStatusHistory().subscribe({
      next: (res) => this.processData(res.statusHistory || []),
      error: () => {
        this.loading = false;
        this.ready = false;
      },
    });
  }

  private processData(history: StatusEntry[]) {
    this.statusHistory = history.slice().reverse();
    this.loading = false;
    this.ready = true;
    this.cdr.detectChanges();
  }
}
