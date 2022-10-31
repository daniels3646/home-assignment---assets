import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ScansService {

    public getscans$ = new BehaviorSubject<any>(null);

    public getscans_init = this.http.get("api/scans/").pipe(tap(val => {this.getscans$.next(val)}))

    constructor(private http: HttpClient) { }

    public getAssets(message: string) {
        return this.http.get("api/scans/")
    }
}

