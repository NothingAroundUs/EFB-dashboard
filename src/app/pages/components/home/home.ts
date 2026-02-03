import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DataGet } from '../../../shared/services/data-get.service';
import { AggregatedData, ScanDatum } from '../../../shared/interfaces/scan.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  providers: [DataGet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  loading = true;
  ready = false;
  scanData: ScanDatum[] = [];
  aggregated: AggregatedData[] = [];
  totalScans = 0;

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
    // no charts to destroy here, but keeping symmetry
  }

  private reload() {
    this.loading = true;
    this.ready = false;

    this.dataService.getData().subscribe({
      next: (res) => this.processData(res.scanData || []),
      error: () => {
        this.loading = false;
        this.ready = false;
      },
    });
  }

  private processData(scanData: ScanDatum[]) {
    this.scanData = scanData;
    this.totalScans = scanData.length;

    const map = new Map<string, AggregatedData>();
    this.scanData.forEach((scan) => {
      const cat = scan.ContCategory || 'Unknown';
      const key = `${scan.Activity}||${cat}`;

      if (map.has(key)) {
        map.get(key)!.Participants++;
      } else {
        map.set(key, {
          ActivityName: scan.Activity || 'Unknown',
          Participants: 1,
          VolunteerCategory: cat,
        });
      }
    });

    this.aggregated = Array.from(map.values());
    this.loading = false;
    this.ready = true;
    this.cdr.detectChanges();
  }
}
