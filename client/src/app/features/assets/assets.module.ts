import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetListComponent } from './asset-list/asset-list.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        AssetsRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
      MatDatepickerModule,
      MatInputModule,
      NgxMatDatetimePickerModule,
      NgxMatTimepickerModule,
      MatButtonModule,
      NgxMatMomentModule,
      MatRadioModule,
      MatSelectModule,
      MatCheckboxModule

    ],
    declarations: [
        AssetListComponent,
        EditAssetComponent,
    ]
})
export class AssetsModule { }
