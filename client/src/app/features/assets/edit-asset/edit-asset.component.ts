import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ScansService , scan} from 'src/app/core/services/scans.service';
import {Subject } from 'rxjs';
import {tap} from 'rxjs/operators';
 import {MatDialogModule} from '@angular/material/dialog'; 

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {

  scans$ = new Subject<scan[]>();
  id: number | undefined;
  constructor(
    public route: ActivatedRoute,
    public scansService: ScansService
    ) { }

  ngOnInit(): void {
    this.scansService.getscans(this.route.snapshot.params['id']).pipe(tap((val : scan[]) => {this.scans$.next(val)})).subscribe();
  }

}
