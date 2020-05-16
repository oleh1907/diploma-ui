import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis.component';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AnalysisComponent }]),
  ],
})
export class AnalysisModule {}
