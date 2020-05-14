import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {

    constructor(private elementRef:ElementRef){

    }

    clickSearch(){
        var _searchContainers = this.elementRef.nativeElement.querySelector('.expandSearch');
        if(_searchContainers.className === "expandSearch"){
            _searchContainers.classList.add("expandSearch");
            _searchContainers.classList.add("showSearch")
        }else{
            _searchContainers.classList.remove("showSearch")
        }
    }    

}