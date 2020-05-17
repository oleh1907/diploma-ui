import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AnalysisComponent }]),
  ],
})
export class AnalysisModule {}
