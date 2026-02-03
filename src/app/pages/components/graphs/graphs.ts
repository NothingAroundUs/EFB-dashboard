import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGet } from '../../../shared/services/data-get.service';
import { ScanDatum, AggregatedData } from '../../../shared/interfaces/scan.interface';
import { Chart, registerables } from 'chart.js';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule],
  providers: [DataGet],
  templateUrl: './graphs.html',
  styleUrl: './graphs.css',
})
export class Graphs implements AfterViewInit, OnDestroy {
  loading = true;
  ready = false;
  scanData: ScanDatum[] = [];
  aggregated: AggregatedData[] = [];
  totalScans = 0;

  private charts: Chart[] = [];
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
    this.destroyCharts();
  }

  private reload() {
    this.destroyCharts();
    this.loading = true;
    this.ready = false;

    // Fetch data live from service (no resolver)
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

    // Aggregate scan data
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

    // Build charts asynchronously
    queueMicrotask(() => this.buildCharts());
  }

  /* =======================
     Chart Builders
     ======================= */
  private buildCharts() {
    this.destroyCharts();
    this.activityChart();
    this.categoryChart();
  }

  private destroyCharts() {
    this.charts.forEach((c) => c.destroy());
    this.charts = [];
  }

  private colors(count: number) {
    const palette = [
      '#0d6efd',
      '#198754',
      '#ffc107',
      '#dc3545',
      '#6610f2',
      '#20c997',
      '#fd7e14',
      '#6f42c1',
    ];
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
  }

  private activityChart() {
    const map = new Map<string, number>();
    this.scanData.forEach((s) => map.set(s.Activity, (map.get(s.Activity) || 0) + 1));

    const labels = [...map.keys()];
    const data = [...map.values()];

    this.charts.push(
      new Chart('activityChart', {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: this.colors(data.length),
              borderRadius: 6,
            },
          ],
        },
        options: { responsive: true },
      }),
    );
  }

  private categoryChart() {
    const map = new Map<string, number>();
    this.scanData.forEach((s) => {
      const cat = s.ContCategory || 'Unknown';
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    this.charts.push(
      new Chart('categoryChart', {
        type: 'pie',
        data: {
          labels: [...map.keys()],
          datasets: [
            {
              data: [...map.values()],
              backgroundColor: this.colors(map.size),
            },
          ],
        },
      }),
    );
  }
}
