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
    const version = this.route.snapshot.paramMap.get('version');
    this.version = version;

    if (version) {
      this.forceDownload(version);
    }
  }

  forceDownload(version: string | null) {
    if (!version) return;

    const url = `https://egtfb.vercel.app/versions/${version}/EFB.apk`;

    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', '');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
