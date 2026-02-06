import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-download-page',
  imports: [CommonModule],
  templateUrl: './download-page.html',
  styleUrl: './download-page.css',
})
export class DownloadPage {
  version: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.version = this.route.snapshot.paramMap.get('version');
    if (this.version) {
      this.forceDownload(this.version);
    }
  }

  forceDownload(version: string | null) {
    if (!version) return;

    const url = `https://github.com/NothingAroundUs/EFB-dashboard/releases/download/${version}/EFB.apk`;

    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', '');
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
