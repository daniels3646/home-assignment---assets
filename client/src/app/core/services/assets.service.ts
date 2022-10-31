import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AssetsService {

    public getassets$ = new BehaviorSubject<any>(null);

    public getassets_init = this.http.get("api/assets/").pipe(tap(val => {this.getassets$.next(val)}))

    constructor(private http: HttpClient) { }

    public getAssets() {
        return this.http.get("api/assets/")
    }
}

