import { Component } from '@angular/core';

@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})
export class MyGridComponent {
  data: any[] = [
    { id: 1, name: 'Product A', price: 10.99 },
    { id: 2, name: 'Product B', price: 19.99 },
    // ... more data
  ];

  // Function to create custom header with image and text
  getHeader(panel: any) {
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';

    // Create image element
    const img = document.createElement('img');
    img.src = 'path/to/your/image.png'; // Replace with your image path
    img.style.marginRight = '5px'; 
    header.appendChild(img);

    // Create text element
    const text = document.createTextNode(panel.header);
    header.appendChild(text);

    return header;
  }
}