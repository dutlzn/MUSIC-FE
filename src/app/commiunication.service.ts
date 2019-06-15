import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommiunicationService {
  
  backendAddress:String = environment.BE_URL;
  constructor(private readonly http: HttpClient) {
   }

   parseTable(files) {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.http.post(this.backendAddress + '/get_file', formData);
  }
  
}
