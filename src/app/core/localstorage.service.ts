import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LocalStorageShortLinks = {
  name: string,
  redirectTo: string,
  hash: string;
}

@Injectable({
  providedIn: 'root',
})



export class LocalStorageService {
  constructor() { }
  KEY = "SHORTURLS";
  private urlsSubject = new BehaviorSubject<LocalStorageShortLinks[]>(this.getAllUrls());
  urls$ = this.urlsSubject.asObservable();
  // Set item in local storage
  addNewUrl(newItem: Omit<LocalStorageShortLinks, 'hash'>) {
    const urls = this.getAllUrls();

    let hash: string;
    do {
      hash = this.generateHash();
    } while (urls.some(u => u.hash === hash));

    const newLink: LocalStorageShortLinks = {
      ...newItem,
      hash
    };

    const updated = [...urls, newLink];
    localStorage.setItem(this.KEY, JSON.stringify(updated));
    this.urlsSubject.next(updated);
  }

  // Get item from local storage
  getAllUrls(): LocalStorageShortLinks[] | [] {
    try {
      const value = localStorage.getItem(this.KEY);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error reading from local storage', error);
      return [];
    }
  }
  getUrlByHash(hash: string): LocalStorageShortLinks | [] {
    try {
      const value = localStorage.getItem(this.KEY);
      if (!value) return [];

      const parsed: LocalStorageShortLinks[] = JSON.parse(value);

      const found = parsed.find(item => item.hash === hash);
      return found ? found : [];

    } catch (error) {
      console.error('Erro a ler do localStorage', error);
      return [];
    }
  }
  // Remove item from local storage
  removeItem(hash: string) {
    const updated = this.getAllUrls().filter(u => u.hash !== hash);
    localStorage.setItem(this.KEY, JSON.stringify(updated));
    this.urlsSubject.next(updated); // notifica os subscritores
  }


  private generateHash(length: number = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let hash = '';
    for (let i = 0; i < length; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  }
}