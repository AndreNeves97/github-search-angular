import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://api.github.com';

  constructor(private httpClient: HttpClient) {}

  public get<T>(path: string, params: {}) {
    return this.httpClient.get<T>(`${this.baseUrl}/${path}`, { params });
  }
}
