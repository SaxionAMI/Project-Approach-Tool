import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Card } from "@app/core/models/card.model";
import * as config from "@app/config";
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
   * Updates a card
   * @param cardId Id of the card to update
   * @param fields Updated card fields
   * @returns Observable with updated card
   * @deprecated Update workspace instead
   */
  updateCard(cardId: string | number, fields: Partial<Card>): Observable<Card> {
    return this.httpClient.put<Card>(
      `${config.apiUrl}${this.cardUrlExtension}/${cardId}`,
      fields
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
