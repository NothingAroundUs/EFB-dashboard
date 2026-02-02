import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  imports: [],
  templateUrl: './documentation.html',
  styleUrl: './documentation.css',
})
export class Documentation {
  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
