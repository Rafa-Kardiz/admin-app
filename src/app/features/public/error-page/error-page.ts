import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-error-page',
  imports: [NgOptimizedImage, ButtonModule],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss'
})
export class ErrorPage {

}
