import { Component, inject, type OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/localstorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.html',
  styleUrl: './redirect.css'
})
export class Redirect implements OnInit {
  private route = inject(ActivatedRoute);
  private localService = inject(LocalStorageService);
  hash: string | null = null;
  error = false;
  ngOnInit() {
    this.hash = this.route.snapshot.paramMap.get('hash');
    if (!this.hash) {
      console.log("Nao existe")
      this.error = true;
      return;
    }
    console.log("existe: ", this.hash);

    const urls = this.localService.getAllUrls();
    const match = urls.find(u => u.hash === this.hash);

    if (match) {
      console.log("Foi")
      window.location.href = match.redirectTo;
    } else {
      this.error = true;
    }
  }
}
