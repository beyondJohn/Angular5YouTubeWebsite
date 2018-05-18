import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;
  constructor(
    
    private _httpClient: HttpClient
  ) { }

  ngOnInit() {
  }
  apiEndPoint = 'http://switchmagic.com:4111/api/files';
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();

        //let options = new RequestOptions({ headers: headers });
        this._httpClient.post(this.apiEndPoint, 'hello').subscribe(
                data => console.log('success'),
                error => console.log(error)
            )
    }
}
}
