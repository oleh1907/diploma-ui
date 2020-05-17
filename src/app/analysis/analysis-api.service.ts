import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FoodInfo } from './models/FoodInfo.model';

@Injectable({
  providedIn: 'root',
})
export class AnalysisApiService {
  constructor(private http: HttpClient) {}

  public analyzeImage(imageToAnalyze: File) {
    let data = new FormData();
    data.append('image', imageToAnalyze);

    return this.http.post<FoodInfo>(environment.APIAddress + 'analysis', data);
  }
}
