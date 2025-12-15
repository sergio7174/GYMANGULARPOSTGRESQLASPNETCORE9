import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  private readonly baseUrl = environment.endpoint;
  private readonly http = inject(HttpClient);

  constructor(){ this.myAppUrl = environment.endpoint;
                 this.myApiUrl = '/api/trainers';}

 //method OR FUNCTION to create a new staff

 createstaff(staff:any, selectedFile:any): Observable<any> {

  const uploadData = new FormData();

    //alert("Im at staff service - line 27 - staff.name:"+staff.name);
  
    uploadData.append("name", staff.name);
    uploadData.append("email", staff.email);
    uploadData.append("age", staff.age);
    uploadData.append("field", staff.field);
    uploadData.append("id_card", staff.id_card);
    uploadData.append("phone", staff.phone);
    uploadData.append("address", staff.address);
    uploadData.append("gender", staff.gender);
    uploadData.append("status", staff.status);
    uploadData.append("image", selectedFile);
 
 return this.http.post(`${this.myAppUrl}${this.myApiUrl}/createTrainer/`, uploadData)}

//End of the Block to method Service to create a new staff

//method to edit an User Staff

editstaff(staff:any, selectedFile:any, id:any): Observable<any> {

  const uploadData = new FormData();

    uploadData.append("name", staff.name);
    uploadData.append("email", staff.email);
    uploadData.append("age", staff.age);
    uploadData.append("field", staff.field);
    uploadData.append("id_card", staff.id_card);
    uploadData.append("phone", staff.phone);
    uploadData.append("address", staff.address);
    uploadData.append("gender", staff.gender);
    uploadData.append("status", staff.status);
    uploadData.append("image", selectedFile);
    
      //alert ('Estoy en staff service -line 45 - this.baseUrlPut+ id'+`${this.myAppUrl}${this.myApiUrl}/update-staff/${id}`)

      return this.http.put(`${this.myAppUrl}${this.myApiUrl}/update-trainer/${id}`, uploadData, selectedFile)}

//End of the Block to method OR FUNCTION to Edit a saved staff
//*************************************************************/

//method Service to List all categories

getstaffList(){ 

  //alert("Estoy en staff.service.ts - line 56");
  /*alert ('Estoy en staff service -line 57 - ${this.myAppUrl}${this.myApiUrl}/listAll'
    +`${this.myAppUrl}${this.myApiUrl}/listAll`)*/

  return this.http.get(
    `${this.myAppUrl}${this.myApiUrl}/listAll`) }
  
  //End of the Block to method Service to List all staffs
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

deletestaff(id:any){ 

  
  //alert("Estoy en staff.service.ts - deletestaff line 80, id:"+id);

  return this.http.delete( `${this.myAppUrl}${this.myApiUrl}/delete-trainer/${id}`,)
}
//End of the Block to method Service to List all products
//*************************************************************/

//method Service to get a staff By id
getstaffById(id:any){ 

  //alert("Estoy en staff.service.ts - getstaffById line 90, id:"+id);
  
  return this.http.get(`${this.myAppUrl}${this.myApiUrl}/get-single-trainer/${id}`)}

//End of the Block to method Service get a staff By id
//*************************************************************/

}






