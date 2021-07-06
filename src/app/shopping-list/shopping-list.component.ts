import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private igSub: Subscription

  constructor(private slService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.igSub = this.store.select('shoppingList').subscribe(
      storeData => {
        this.ingredients = storeData.ingredients
      }
    )
  }

  ngOnDestroy(){
    this.igSub.unsubscribe()
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index)
  }

}
