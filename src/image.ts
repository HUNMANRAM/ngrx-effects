import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WjFlexGrid, WjGridModule } from '@grapecity/wijmo.angular2.grid'; 

@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})
export class MyGridComponent implements AfterViewInit {
  @ViewChild('myGrid', { static: false }) myGrid!: WjFlexGrid; 

  data: any[] = [
    { id: 1, name: 'Product A', price: 10.99 },
    { id: 2, name: 'Product B', price: 19.99 },
    // ... more data
  ];

  ngAfterViewInit() {
    if (this.myGrid) { 
      const img = new Image(); 
      img.src = 'assets/images/your-image.svg'; 
      img.onload = () => { 
        const headerDiv = document.createElement('div');
        headerDiv.style.display = 'flex';
        headerDiv.style.alignItems = 'center';
        headerDiv.appendChild(img);
        headerDiv.appendChild(document.createTextNode(' ' + this.myGrid.columns[0].header)); 

        // Append the headerDiv to the DOM
        const gridHeader = this.myGrid.hostElement.querySelector('.wj-header'); 
        gridHeader?.appendChild(headerDiv); 

        this.myGrid.columns[0].header = headerDiv.id; 
      };
    }
  }
}