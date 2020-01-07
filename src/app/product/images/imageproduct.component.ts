import { Component, OnInit } from '@angular/core';
import {Image} from './image';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'image-product',
    templateUrl: './imageproduct.component.html',
    styleUrls: ['./imageproduct.component.css']
})

export class ImageProductComponent implements OnInit{
    images: Image[];
    fileData: File = null;
    previewUrl:any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    constructor() { }
    
    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
    }

    preview() {
        // Show preview 
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
     
        var reader = new FileReader();      
        reader.readAsDataURL(this.fileData); 
        reader.onload = (_event) => { 
            this.previewUrl = reader.result; 
        }
    }
    ngOnInit(){
    }
}