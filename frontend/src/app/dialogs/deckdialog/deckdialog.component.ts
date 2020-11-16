import { Component, OnInit, Inject } from "@angular/core";
import { DeckService } from "src/app/services/deck.service";
import { Deck } from "src/app/models/deck.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WorkspaceComponent } from "src/app/workspace/workspace.component";
@Component({
  selector: "app-deckdialog",
  templateUrl: "./deckdialog.component.html",
  styleUrls: ["./deckdialog.component.css"],
})
export class DeckdialogComponent implements OnInit {
  allDecks: Deck[] = [];
  oldDecks: Deck[] = [];
  chosenDecks: Deck[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deckService: DeckService,
    public dialogRef: MatDialogRef<WorkspaceComponent>
  ) {}

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    this.deckService.getDecks().subscribe((decks) => {
      this.allDecks = decks;
    });
    this.oldDecks = JSON.parse(JSON.stringify(this.data.decks));
    this.chosenDecks = this.data.decks;
  }

  /**
   * Select a deck to use within the workspace.
   * @param  {} selectedDeck
   * @returns void
   */
  selectThisDeck(selectedDeck): void {
    const foundDeck = this.chosenDecks.find(
      (deck) => deck.title === selectedDeck.title
    );
    if (!foundDeck) {
      const newDeck: Deck = new Deck();
      newDeck.shortDescription = selectedDeck.shortDescription;
      newDeck.title = selectedDeck.title;
      newDeck.types = selectedDeck.types.slice();
      this.chosenDecks.push(newDeck);
    } else {
      const index = this.chosenDecks.findIndex(
        (deck) => deck.title === selectedDeck.title
      );
      this.chosenDecks.splice(index, 1);
    }
  }

  /**
   * Select a type from a deck to use within the workspace.
   * @param  {Deck} selectedDeck
   * @param  {string} selectedType
   * @returns void
   */
  selectThisType(selectedDeck: Deck, selectedType: string): void {
    const foundDeck = this.chosenDecks.find(
      (deck) => deck.title === selectedDeck.title
    );
    const newDeck: Deck = new Deck();
    newDeck.shortDescription = selectedDeck.shortDescription;
    newDeck.title = selectedDeck.title;
    newDeck.types = [];

    if (!foundDeck) {
      newDeck.types.push(selectedType);
      this.chosenDecks.push(newDeck);
    } else {
      const foundtype = foundDeck.types.find((type) => type === selectedType);
      if (!foundtype) {
        const deckIndex = this.chosenDecks.findIndex(
          (deck) => deck.title === selectedDeck.title
        );

        this.chosenDecks[deckIndex].types.push(selectedType.slice());
      } else {
        const deckIndex = this.chosenDecks.findIndex(
          (deck) => deck.title === selectedDeck.title
        );

        const typeIndex = this.chosenDecks[deckIndex].types.findIndex(
          (type) => type === selectedType
        );

        this.chosenDecks[deckIndex].types.splice(typeIndex, 1);
        if (this.chosenDecks[deckIndex].types.length === 0) {
          this.chosenDecks.splice(deckIndex, 1);
        }
      }
    }
  }

  /**
   * Check if the type is in the array to mark the box.
   * @param  {Deck} selectedDeck
   * @param  {string} selectedType
   * @returns boolean
   */
  checkIfTypeIsInArray(selectedDeck: Deck, selectedType: string): boolean {
    const foundDeck = this.chosenDecks.find(
      (deck) => deck.title === selectedDeck.title
    );
    if (foundDeck) {
      const foundtype = foundDeck.types.find((type) => type === selectedType);
      if (foundtype) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * Check if the deck is in a array to mark the box.
   * @param  {Deck} selectedDeck
   * @returns Boolean
   */
  checkIfDeckIsInArray(selectedDeck: Deck): boolean {
    const foundDeck = this.chosenDecks.find(
      (deck) => deck.title === selectedDeck.title
    );
    if (foundDeck) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Save the chosen decks in a workspace.
   * @returns void
   */
  onSave(): void {
    this.dialogRef.close(this.chosenDecks);
  }

  /**
   * Close the dialog.
   * @returns void
   */
  onClose(): void {
    this.data.decks = this.oldDecks;
    this.dialogRef.close("");
  }
}
