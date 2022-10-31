import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScansService {

    constructor(private http: HttpClient) { }

    public getAssets(message: string) {
        return this.http.get("api/scans/")
    }
}

