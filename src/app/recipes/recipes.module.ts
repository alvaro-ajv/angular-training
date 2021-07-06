import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from '../shared/dropdown.directice';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipesStartComponent,
    RecipesEditComponent,

  ],
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ],
  // exports: [
  //   RecipesComponent,
  //   RecipesDetailComponent,
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipesStartComponent,
  //   RecipesEditComponent,
  // ]
})
export class RecipesModule { }
