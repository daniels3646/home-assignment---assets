import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScansRoutingModule } from './scans-routing.module';
import { ScanListComponent } from './scan-list/scan-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ScansRoutingModule
  ],
  declarations: [ScanListComponent]
})
export class ScansModule { }
