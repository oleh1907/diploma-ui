import { Component, OnInit } from '@angular/core';
import { AnalysisApiService } from './analysis-api.service';
import { FoodInfo } from './models/FoodInfo.model';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {
  private image: File;
  imgURL: any;

  error: string;
  IsLoading: boolean = false;

  foodInfo: FoodInfo;

  constructor(private analysisAPIService: AnalysisApiService) {}

  ngOnInit(): void {}

  public onFileSelect(event) {
    this.foodInfo = null;
    this.error = null;

    if (event.target.files.length === 0) {
      return;
    } else {
      let mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.error = 'Підтримуються лише зображення';
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };

      this.image = event.target.files[0];
    }
  }

  public onAnalyze() {
    this.IsLoading = true;
    this.analysisAPIService.analyzeImage(this.image).subscribe(
      (foodInfo: FoodInfo) => {
        this.IsLoading = false;
        this.foodInfo = foodInfo;
      },
      (error) => {
        console.log(error);
        this.IsLoading = false;
        this.error = 'Помилка: ' + error.error;
      }
    );
  }
}
