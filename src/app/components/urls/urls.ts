import { Component, inject, type OnInit } from '@angular/core';
import { LocalStorageService, type LocalStorageShortLinks } from '../../core/localstorage.service';

@Component({
  selector: 'app-urls',
  imports: [],
  templateUrl: './urls.html',
  styleUrl: './urls.css'
})
export class Urls {
  urls: LocalStorageShortLinks[] | [] = [];

  private localService = inject(LocalStorageService);

  constructor() {
    this.localService.urls$.subscribe(data => {
      this.urls = data;
    });
  }

  deleteUrl(hash: string) {
    console.log("Hash: ", hash)
    this.localService.removeItem(hash);
  }

}
