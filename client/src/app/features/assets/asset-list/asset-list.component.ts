import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { AssetsService } from 'src/app/core/services/assets.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap ,NavigationExtras} from '@angular/router';


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
  ) { }

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
