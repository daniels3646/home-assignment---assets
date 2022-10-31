import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NGXLogger } from 'ngx-logger';
import { ScansService } from 'src/app/core/services/scans.service';

@Component({
  selector: 'app-scan-list',
  templateUrl: './scan-list.component.html',
  styleUrls: ['./scan-list.component.css']
})
export class ScanListComponent implements OnInit {


  constructor(
    private logger: NGXLogger,
    private titleService: Title,
    public scansService: ScansService
  ) { }

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  displayedColumns: string[] = ['status', 'startsAt', 'name', 'ip'];

  ngOnInit() {
    this.scansService.getscans_init.subscribe();
    this.titleService.setTitle('home assignment - Scans');
    this.logger.log('Scans loaded');
  }
}
