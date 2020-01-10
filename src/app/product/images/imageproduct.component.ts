import { Component, OnInit } from '@angular/core';
import {Image} from './image';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'image-product',
    templateUrl: './imageproduct.component.html',
    styleUrls: ['./imageproduct.component.css'],
    providers: [MessageService]
})

export class ImageProductComponent implements OnInit{
    images: any[] = [];
    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) { }
    
    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    onSelect(event){
        for(let image of event.files){
            this.images.push(image);
        }
        console.log(this.images);
        return this.images;
    }

    ngOnInit(){
        console.log(this.images);
    }
}