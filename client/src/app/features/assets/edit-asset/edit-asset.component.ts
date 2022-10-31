import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {

  id: number | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.id = params['id'];
  });
  }

}
