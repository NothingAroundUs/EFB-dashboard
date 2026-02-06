import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPage } from './download-page';

describe('DownloadPage', () => {
  let component: DownloadPage;
  let fixture: ComponentFixture<DownloadPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
