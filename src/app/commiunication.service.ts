import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommiunicationService {
  
  backendAddress:String = 'http://127.0.0.1:5000';
  constructor(private readonly http: HttpClient) {
   }

   parseTable(files) {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.http.post(this.backendAddress + '/get_file', formData);
  }
  
}
