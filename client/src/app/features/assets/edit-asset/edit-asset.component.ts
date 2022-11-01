import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ScansService , scan} from 'src/app/core/services/scans.service';
import {Subject } from 'rxjs';
import {tap} from 'rxjs/operators';
 import {MatDialogModule} from '@angular/material/dialog'; 
 import { FormControl, FormGroup, Validators } from '@angular/forms';
 import * as _moment from 'moment';
 import {  Moment, MomentFormatSpecification, MomentInput } from 'moment';
const moment = _moment;



@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {
  public formGroup = new FormGroup({
    date: new FormControl(moment().utc().utcOffset(5), [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })

  scans$ = new Subject<scan[]>();
  id: number | undefined;
  constructor(
    public route: ActivatedRoute,
    public scansService: ScansService
    ) { }

  ngOnInit(): void {
    this.scansService.getscans(this.route.snapshot.params['id']).pipe(tap((val : scan[]) => {this.scans$.next(val)})).subscribe();
    this.formGroup.get('date')?.setValue(null);
  }
  addScan(){
    let chosenDateTime = this.formGroup.get('date')?.value?.toISOString();
    if(chosenDateTime){
      this.scansService.postscan(this.route.snapshot.params['id'],chosenDateTime).subscribe();
      this.formGroup.get('date')?.setValue(null);
    }else{
      console.log("choose a time")
    }
  }

}
