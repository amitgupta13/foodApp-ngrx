import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx'
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService,
        private authService: AuthService){}

    storeRecipes(){
        // const headers = new HttpHeaders().set('Authorization', 'sdad');
        // return this.http.put(
        //     `https://http-8a947.firebaseio.com/recipes.json`,
        //     this.recipeService.getRecipes(),
        //     {
        //         observe: 'body',
        //         // Headers,
        //         params: new HttpParams().set('auth', token)
        //     }
        // );
        const req = new HttpRequest('PUT',
            `https://http-8a947.firebaseio.com/recipes.json`,
            this.recipeService.getRecipes(),
            {
                // observe: 'body',
                reportProgress:true,
                // Headers,
            }
        )

        return this.http.request(req);
    }

    getRecipes(){
        this.authService.getToken();

        this.http.get<Recipe[]>(
            `https://http-8a947.firebaseio.com/recipes.json`,
            {
                responseType:'json',
                observe: 'body',
            }
        )
        .map((recipes)=>{
            for(let recipe of recipes){
                if(!recipe.ingredients){
                    recipe.ingredients = [];
                }
            }
            return recipes;
        })
        .subscribe(
            (recipes: Recipe[])=>{
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}