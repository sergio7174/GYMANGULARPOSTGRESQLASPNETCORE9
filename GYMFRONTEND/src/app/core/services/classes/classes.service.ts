import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  private readonly baseUrl = environment.endpoint;
  private readonly http = inject(HttpClient);

  constructor(){ this.myAppUrl = environment.endpoint;
                 this.myApiUrl = '/api/classes';}

 //method OR FUNCTION to create a new classes

 createclasses(classes:any, selectedFile:any): Observable<any> {

  const uploadData = new FormData();

    //alert("Im at classes service - line 26 - classes.classname:"+classes.classname);
  
    uploadData.append("classname", classes.classname);
    uploadData.append("code", classes.code);
    uploadData.append("classlevel", classes.classlevel); //low-medium-high
    uploadData.append("classday", classes.classday); // hours string
    uploadData.append("session_time", classes.session_time); // # days
    uploadData.append("dateBegin", classes.dateBegin); // when class will b
    uploadData.append("price", classes.price); //per month
    uploadData.append("trainer", classes.trainer);
    uploadData.append("classtime", classes.classtime); // string
    uploadData.append("key_benefits", classes.key_benefits);
    uploadData.append("expert_trainer", classes.expert_trainer);
    uploadData.append("class_overview", classes.class_overview);
    uploadData.append("why_matters", classes.why_matters);
    uploadData.append("image", selectedFile);

alert ('Estoy en classes service -line 43 - '+`${this.myAppUrl}${this.myApiUrl}/createClasse`)
 //return this.http.post(`${this.myAppUrl}${this.myApiUrl}/createClass`, uploadData, selectedFile)}
   return this.http.post(`${this.myAppUrl}${this.myApiUrl}/createClass`, uploadData)}
//End of the Block to method Service to create a new classes

//method to edit an furniture
editclasses(classes:any, selectedFile:any, id:any): Observable<any> {

  const uploadData = new FormData();

  uploadData.append("classname", classes.classname);
  uploadData.append("code", classes.code);
  uploadData.append("classlevel", classes.classlevel); //low-medium-high
  uploadData.append("classday", classes.classday); // hours string
  uploadData.append("session_time", classes.session_time); // # days
  uploadData.append("dateBegin", classes.dateBegin); // when class will b
  uploadData.append("price", classes.price); //per month
  uploadData.append("trainer", classes.trainer);
  uploadData.append("classtime", classes.classtime); // string
  uploadData.append("key_benefits", classes.key_benefits);
  uploadData.append("expert_trainer", classes.expert_trainer);
  uploadData.append("class_overview", classes.class_overview);
  uploadData.append("why_matters", classes.why_matters);
  uploadData.append("image", selectedFile);
    
      //alert ('Estoy en classes service -line 45 - this.baseUrlPut+ id'+`${this.myAppUrl}${this.myApiUrl}/update-classes/${id}`)

      return this.http.put(`${this.myAppUrl}${this.myApiUrl}/update-classe/${id}`, uploadData)}

//End of the Block to method OR FUNCTION to Edit a saved classes
//*************************************************************/

//method Service to List all categories

getclassesList(){ 

  //alert("Estoy en classes.service.ts - line 56");
  /*alert ('Estoy en classes service -line 57 - ${this.myAppUrl}${this.myApiUrl}/listAll'
    +`${this.myAppUrl}${this.myApiUrl}/listAll`)*/

  return this.http.get(
    `${this.myAppUrl}${this.myApiUrl}/listAll`) }
  
  //End of the Block to method Service to List all classess
//*************************************************************/

//*************************************************************/
//method Service to delete a product

deleteImage(image:any){

  //alert("Estoy en product.service.ts - delete Image line 82, image:"+image);

  const formData = new FormData();
    formData.append('image', image);

    //alert("Estoy en product.service.ts - delete Image line 88, image:"+ uploadData);  

    // first I will Erase The image in Uploads dir in BackEnd
  return this.http.post(`${this.myAppUrl}${this.myApiUrl}/DeleteImage`,formData);

}

deleteclasses(id:any){ 

  
  //alert("Estoy en classes.service.ts - deleteclasses line 80, id:"+id);

  return this.http.delete( `${this.myAppUrl}${this.myApiUrl}/delete-classe/${id}`,)
}
//End of the Block to method Service to List all products
//*************************************************************/

//method Service to get a classes By id
getclassById(id:any){ 

  //alert("Estoy en classes.service.ts - getclassesById line 117, id:"+id);
  
  return this.http.get(`${this.myAppUrl}${this.myApiUrl}/get-single-classe/${id}`)}

//End of the Block to method Service get a classes By id
//*************************************************************/

}





