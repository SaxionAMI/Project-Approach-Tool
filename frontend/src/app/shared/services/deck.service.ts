import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as config from "@app/config";
import { Observable } from "rxjs";
import { Deck } from "@app/core/models/deck.model";
@Injectable({
  providedIn: "root",
})
export class DeckService {
  deckUrlExtension = "deck";
  constructor(private httpClient: HttpClient) {}

  /**
   * get all deck types
   * @returns Observable
   */
  getDecks(): Observable<Deck[]> {
    return this.httpClient.get<Deck[]>(config.apiUrl + this.deckUrlExtension);
  }
}
