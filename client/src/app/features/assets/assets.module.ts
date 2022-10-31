import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetListComponent } from './asset-list/asset-list.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';

@NgModule({
    imports: [
        CommonModule,
        AssetsRoutingModule,
        SharedModule
    ],
    declarations: [
        AssetListComponent,
        EditAssetComponent
    ]
})
export class AssetsModule { }
