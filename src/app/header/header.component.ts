import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from '../store/app.reducer'
import * as RecipesActions from '../recipes/store/recipes.actions'

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription
    isAuthenticated = false

    @Output() onSelectedOption = new EventEmitter<string>()

    constructor(
        private dataStorageService: DataStorageService, 
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !!user
            }
        )
    }

    onSelected(option: string) {
        this.onSelectedOption.emit(option)
    }

    onSaveData(){
        this.store.dispatch(new RecipesActions.StoreRecipes())
    }

    onFetchData(){
        this.store.dispatch(new RecipesActions.FetchRecipes())
    }
    
    ngOnDestroy(){
        this.userSub.unsubscribe()
    }

    onLogout(){
        this.authService.logout()
    }
}