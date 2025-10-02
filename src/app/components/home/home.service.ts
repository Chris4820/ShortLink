import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type CreateUrlProps = {
  name: string,
  url: string,
}

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  async getUrl(): Promise<string> {
    return firstValueFrom(
      this.http.get<string>(this.apiUrl)
    );
  }

  async createUrl(data: CreateUrlProps) {
    console.log(data);
    return firstValueFrom(
      this.http.post(this.apiUrl, {
        data,
      })
    );
  }
}