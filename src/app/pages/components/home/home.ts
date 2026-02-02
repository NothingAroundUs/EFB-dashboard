import { Component } from '@angular/core';
import { DataGet } from '../../../shared/services/data-get.service';
import { AggregatedData, ScanDatum } from '../../../shared/interfaces/scan.interface';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  scanData: ScanDatum[] = [];
  aggregated: AggregatedData[] = [];
  totalScans = 0;
  loading = true;

  constructor(private scanService: DataGet) {}

  ngOnInit(): void {
    this.loading = true;
    this.scanService.getData().subscribe(
      (res) => {
        this.scanData = res.scanData || [];
        this.totalScans = this.scanData.length;

        const map = new Map<string, AggregatedData>();
        this.scanData.forEach((scan) => {
          const volunteerCategory = scan.ContCategory || 'Unknown';
          const key = `${scan.Activity}||${volunteerCategory}`;

          if (map.has(key)) {
            map.get(key)!.Participants += 1;
          } else {
            map.set(key, {
              ActivityName: scan.Activity || 'Unknown',
              Participants: 1,
              VolunteerCategory: volunteerCategory,
            });
          }
        });

        this.aggregated = Array.from(map.values());
        this.loading = false;
      },
      () => {
        this.aggregated = [];
        this.loading = false;
      },
    );
  }
}
