import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as fromApp from '../../store/app.reducer'
import * as ShoppingListActions from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false
  editedItemIndex: number  
  editedItem: Ingredient

  @ViewChild('f', {static: false}) slForm: NgForm

  constructor(private slService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true
        this.editedItemIndex = index
        this.editedItem = this.slService.getIngredient(index)
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        })
      }
    )
  }

  onSubmitItem(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false
    form.reset()

  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
}
