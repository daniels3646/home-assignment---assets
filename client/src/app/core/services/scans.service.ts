import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface scan{status :string,startsAt:string,asset:{ ip: string,name:string,description:string,dateCreated:string}}

@Injectable({
    providedIn: 'root'
})
export class ScansService {

    public getscans$ = new BehaviorSubject<any>(null);

    public getscans_init = this.http.get("api/scans/").pipe(tap(val => {this.getscans$.next(val)}))

    constructor(private http: HttpClient) { }

    public getscans(assetId: string) : Observable<scan[]>{
        return this.http.get<scan[]>("api/scans/assetId/"+assetId)
    }
    public postscan(assetId: string,startsAt: string) {
        return this.http.post("api/scans/",{assetId,startsAt})
    }

}

