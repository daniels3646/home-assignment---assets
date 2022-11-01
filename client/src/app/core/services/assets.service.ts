import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AssetsService {

    public getassets$ = new BehaviorSubject<any>(null);

    public getassets_init = this.http.get("api/assets/").pipe(tap(val => {this.getassets$.next(val)}))

    constructor(private http: HttpClient) { }

    public getAsset(assetId : string) {
        return this.http.get<{ip :string,name:string,description:string,lastScanned:string,dateCreated:string}>("api/assets/"+assetId)
    }
    public createAsset(ip:string,name:string,description:string) {
        return this.http.post("api/assets/",{ip,name,description})
    }
}

