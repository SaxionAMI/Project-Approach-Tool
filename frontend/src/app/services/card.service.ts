import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Card } from "../models/card.model";
import * as config from "../config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardService {
  cardUrlExtension = "card";
  constructor(private httpClient: HttpClient) {}

  /**
   * get all method cards
   * @returns Observable
   */
  getCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      config.apiUrl + this.cardUrlExtension + "/methods"
    );
  }

  /**
   * get all stepping stone cards
   * @returns Observable
   */
  getSteppingStones(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      config.apiUrl + this.cardUrlExtension + "/steppingstone"
    );
  }

  /**
   * get cards by deck
   * @param  {string} deck - a deck type
   * @returns Observable
   */
  getCardsByDeck(deck: string): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      config.apiUrl + this.cardUrlExtension + "/deck/" + deck
    );
  }
}
