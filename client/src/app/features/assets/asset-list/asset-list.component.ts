import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { AssetsService } from 'src/app/core/services/assets.service';
import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { Router, ActivatedRoute, ParamMap ,NavigationExtras} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  ip: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {

  gridColumns = 3;


  constructor(
    private logger: NGXLogger,
    private titleService: Title,
    public assetsService : AssetsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAssetDialog, {
      width: '250px',
      data: {name: null, ip: null,description:null},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.name && result.ip && result.description){
        this.assetsService.createAsset(result.ip,result.name,result.description).subscribe(_=>{
          this.assetsService.getassets_init.subscribe();
        })
      }
    });
  }

toggleGridColumns() {
  this.gridColumns = this.gridColumns === 3 ? 4 : 3;
}

  ngOnInit() {
    this.assetsService.getassets_init.subscribe();
    this.titleService.setTitle('home assignment - Assets');
    this.logger.log('Assets loaded');

  }
  onSelect(asset: { id: any; }){
    this.router.navigate(['assets','asset',asset.id])
  }
}

@Component({
  selector: 'create-asset-dialog',
  templateUrl: 'create-asset-dialog.html',
})
export class CreateAssetDialog {
  constructor(
    public dialogRef: MatDialogRef<CreateAssetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}