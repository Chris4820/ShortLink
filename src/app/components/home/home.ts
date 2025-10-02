import { Component, inject, type OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Form } from "../form/form";
import { Urls } from "../urls/urls";
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, Form, Urls],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private homeService = inject(HomeService);

  urlForm: FormGroup = new FormGroup({
    name: new FormGroup(""),
    redirectTo: new FormGroup("")
  })

  isLoading = false;
  redirectTo = "";
  count = 0;

  ngOnInit() {
    this.loadUrl();
  }

  items = []

  sumCount() {
    this.count += 1;
  }


  async loadUrl() {
    console.log("Chamado");
    this.isLoading = true;
    try {
      this.redirectTo = await this.homeService.getUrl();
      console.log(this.redirectTo)
    } catch (err) {
      console.log("Erro");
      console.log("Ocorreu um erro")
    } finally {
      console.log("Acabou");
      this.isLoading = false;
    }
  }

  createUrl() {
    const values = this.urlForm.value
    console.log(values);
  }
}
