import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  private readonly baseUrl = environment.endpoint;
  private readonly http = inject(HttpClient);

  constructor(){ this.myAppUrl = environment.endpoint;
                 this.myApiUrl = '/api/category';}


  //method OR FUNCTION to create a new category

createcategory(category:any, selectedFile:any): Observable<any> {

  const uploadData = new FormData();

    //alert("Im at category service - line 27 - category.name:"+category.name);
  
    uploadData.append("name", category.name);
    uploadData.append("description", category.description);
    uploadData.append("image", selectedFile);

 
 return this.http.post(`${this.myAppUrl}${this.myApiUrl}/`, uploadData, selectedFile)}

//End of the Block to method Service to create a new category

//method to edit a category
editcategory(category:any, selectedFile:any, id:any): Observable<any> {

  const uploadData = new FormData();

    uploadData.append("name", category.name);
    uploadData.append("description", category.description);
    uploadData.append("image", selectedFile);
    
    
      /*alert ('Estoy en category service- editcategory -line 47 - this.baseUrlPut+ id'+`${this.myAppUrl}${this.myApiUrl}/update-category/${id}`)*/

      return this.http.put(`${this.myAppUrl}${this.myApiUrl}/update-category/${id}`, uploadData, selectedFile)}

//End of the Block to method OR FUNCTION to Edit a saved category
//*************************************************************/

//method Service to List all categories

getCategoryList(){ 

  //alert("Estoy en category.service.ts - line 56");
  /*alert ('Estoy en category service -line 57 - ${this.myAppUrl}${this.myApiUrl}/listAll'
    +`${this.myAppUrl}${this.myApiUrl}/listAll`)*/

  return this.http.get(
    `${this.myAppUrl}${this.myApiUrl}/listAll`) }
  
  //End of the Block to method Service to List all categorys
//*************************************************************/

//*************************************************************/
//method Service to delete a product

deleteImage(image:any){

  //alert("Estoy en product.service.ts - delete Image line 82, image:"+image);

  const uploadData = {image};

    //alert("Estoy en product.service.ts - delete Image line 88, image:"+ uploadData);  

    // first I will Erase The image in Uploads dir in BackEnd
  return this.http.post(`${this.myAppUrl}${this.myApiUrl}/delete-image`,uploadData);

}

deleteCategory(id:any, image:any){ 

  
  //alert("Estoy en category.service.ts - deleteCategory line 80, id:"+id);

  return this.http.delete( `${this.myAppUrl}${this.myApiUrl}/delete-category/${id}`,)
}
//End of the Block to method Service to List all products
//*************************************************************/

//method Service to get a category By id
getCategoryById(id:any){ 

  //alert("Estoy en category.service.ts - getCategoryById line 90, id:"+id);
  
  return this.http.get(`${this.myAppUrl}${this.myApiUrl}/get-single-category/${id}`)}

//End of the Block to method Service get a category By id
//*************************************************************/

}


