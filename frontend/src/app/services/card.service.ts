import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';
import * as config from '../config';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardUrlExtension = 'card';

  constructor(private httpClient: HttpClient) { }

  getCards() {
    return this.httpClient.get<Card>(config.apiUrl + this.cardUrlExtension);
  }

  getSteppingStones() {
    return this.httpClient.get<Card>(config.apiUrl + this.cardUrlExtension + '/steppingstone');
  }
}
