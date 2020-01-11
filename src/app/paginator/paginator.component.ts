import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'paginator-nav',
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges{
    
    @Input() paginator: any;
    pages: number[];
    initialPage: number;
    finalPage: number;

    constructor(){}

    ngOnInit(){
        this.initPaginator();
    }

    ngOnChanges(changes: SimpleChanges){
        let paginatorUpdated = changes['paginator'];
        if(paginatorUpdated.previousValue){
            this.initPaginator();
        }
    }

    private initPaginator(): void{
        this.initialPage = Math.min(Math.max(1,this.paginator.number-4), this.paginator.totalPages-5); 
        this. finalPage = Math.max(Math.min(this.paginator.totalPages, this.paginator.number+4),6);

        if(this.paginator.totalPages>5){
            this.pages = new Array(this.finalPage - this.initialPage+1).fill(0).map((value, index) => index + this.initialPage);
        }else{
            this.pages = new Array(this.paginator.totalPages).fill(0).map((value, index) => index + 1);
        } 
    }
} 