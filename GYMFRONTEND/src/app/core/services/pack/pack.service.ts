import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  private readonly baseUrl = environment.endpoint;
  private readonly http = inject(HttpClient);

  constructor(){ this.myAppUrl = environment.endpoint;
                 this.myApiUrl = '/api/packs';}

 //method OR FUNCTION to create a new pack

 createpack(pack:any, selectedFile:any): Observable<any> {

  const uploadData = new FormData();

    //alert("Im at pack service - line 27 - pack.features:"+pack.features);
  
    uploadData.append("nameplan", pack.nameplan);
    uploadData.append("trialdays", pack.trialdays);
    uploadData.append("description", pack.description);
    uploadData.append("features", pack.features);
    uploadData.append("timedays", pack.timedays);
    uploadData.append("cost", pack.cost);
    uploadData.append("code", pack.code);
    uploadData.append("status", pack.status);
    uploadData.append("image", selectedFile);

 
 return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, uploadData)}

//End of the Block to method Service to create a new pack

//method to edit an furniture
editpack(pack:any, selectedFile:any, id:any): Observable<any> {

  const uploadData = new FormData();

    uploadData.append("Nameplan", pack.nameplan);
    uploadData.append("Trialdays", pack.trialdays);
    uploadData.append("Description", pack.description);
    uploadData.append("Features", pack.features);
    uploadData.append("Timedays", pack.timedays);
    uploadData.append("Cost", pack.cost);
    uploadData.append("Code", pack.code);
    uploadData.append("Status", pack.status);
    uploadData.append("Image", selectedFile);
    
      //alert ('Estoy en pack service -line 45 - this.baseUrlPut+ id'+`${this.myAppUrl}${this.myApiUrl}/update-pack/${id}`)

      return this.http.put(`${this.myAppUrl}${this.myApiUrl}/update-pack/${id}`, uploadData)}

//End of the Block to method OR FUNCTION to Edit a saved pack
//*************************************************************/

//method Service to List all categories

getpackList(){ 

  //alert("Estoy en pack.service.ts - line 56");
  /*alert ('Estoy en pack service -line 57 - ${this.myAppUrl}${this.myApiUrl}/listAll'
    +`${this.myAppUrl}${this.myApiUrl}/listAll`)*/

  return this.http.get(
    `${this.myAppUrl}${this.myApiUrl}/listAll`) }
  
  //End of the Block to method Service to List all packs
//*************************************************************/

//*************************************************************/
//method Service to delete an image

deleteImage(image:any){

  //alert("Estoy en product.service.ts - delete Image line 82, image:"+image);

   const formData = new FormData();
    formData.append('image', image);

    //alert("Estoy en product.service.ts - delete Image line 88, image:"+ uploadData);  

    // first I will Erase The image in Uploads dir in BackEnd
  return this.http.post(`${this.myAppUrl}${this.myApiUrl}/DeleteImage`,formData);

}
// function to delete a pack

deletepack(id:any){ 

  
  alert("Estoy en pack.service.ts - deletepack line 80, id:"+id);

  return this.http.delete( `${this.myAppUrl}${this.myApiUrl}/delete-pack/${id}`,)
}
//End of the Block to method Service to delete a pack
//*************************************************************/

//method Service to get a pack By id
getpackById(id:any){ 

  //alert("Estoy en pack.service.ts - getpackById line 90, id:"+id);
  
  return this.http.get(`${this.myAppUrl}${this.myApiUrl}/get-single-pack/${id}`)}

//End of the Block to method Service get a pack By id
//*************************************************************/

}





