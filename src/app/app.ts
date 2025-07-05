import { Component } from '@angular/core';
import { RouterOutlet,Router} from '@angular/router';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private router:Router) {
  }
  Hub(){
    this.router.navigate(["/"]);}
  Myquest(){
    this.router.navigate(["/question"]);}
  Myanswer(){
    this.router.navigate(["/answer"]);}
  UserPage(){
    this.router.navigate(["/user"]);}
  Login(){
    this.router.navigate(["/login"]);}
}
