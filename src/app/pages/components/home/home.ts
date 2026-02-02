import { Component } from '@angular/core';
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
  scanData: ScanDatum[] = [];
  aggregated: AggregatedData[] = [];
  totalScans = 0;
  loading: boolean = true;

  constructor(private route: ActivatedRoute) {
    const res = this.route.snapshot.data['scans'];

    this.scanData = res?.scanData || [];
    this.totalScans = this.scanData.length;

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
  }
}
