import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription
    isAuthenticated = false

    @Output() onSelectedOption = new EventEmitter<string>()

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

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
        this.dataStorageService.storeRecipes()
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe()
    }
    
    ngOnDestroy(){
        this.userSub.unsubscribe()
    }

    onLogout(){
        this.authService.logout()
    }
}