import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-download-page',
  imports: [],
  templateUrl: './download-page.html',
  styleUrl: './download-page.css',
})
export class DownloadPage {
  constructor(private route: ActivatedRoute) {}
  versions: string | null = ''

  ngOnInit() {
    const version = this.route.snapshot.paramMap.get('version');
    this.versions = version
    if (version) {
      window.location.href = `https://egtfb.vercel.app/versions/${version}/EFB.apk`;
    }
  }
}
