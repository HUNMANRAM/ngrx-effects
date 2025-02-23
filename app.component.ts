import { Component } from '@angular/core';
import { FlexGridComponent } from './flex-grid/flex-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FlexGridComponent], // Import the standalone FlexGridComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Sample data for the grid
  gridData: any = [
    { id: 1, name: 'John DoeAAAA', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Alice Johnson', age: 28 }
  ];

  // Dynamic column definitions
  gridColumns = [
    { header: 'ID', binding: 'id' },
    { header: 'Full Name', binding: 'name' },
    { header: 'Age', binding: 'age' }
  ];

  rows = 10; // Number of rows to display

  addRow() {
    // Update the data and columns
    this.gridData = [
      { idA: 11, name: 'John DoeA' },
      { idA: 22, name: 'Jane SmithAA' },
      { idA: 33, name: 'Alice JohnsonAAAA' }
    ];

    this.gridColumns = [
      { header: 'IDA', binding: 'idA' },
      { header: 'Full NameAA', binding: 'name' }
    ];
  }


  addRowTwo() {
    // Update the data and columns
    this.gridData = [
      { idA: 11, name: 'John DoeAAAAAA' },
      { idA: 22, name: 'Jane SmithAA' },
      { idA: 33, name: 'Alice JohnsonAAAA' }
    ];

    this.gridColumns = [
      { header: 'IDA', binding: 'idA' },
      { header: 'Full NameAA', binding: 'name' }
    ];
  }

  addRowThree() {
    // Update the data and columns
    this.gridData = this._getData();
    this.gridColumns = [];
    Object.keys(this.gridData[0]).forEach(key => {
      console.log(key, this.gridData[0][key]); 
       this.gridColumns.push({ header: key, binding: key });
    }
    );

    // this.gridColumns = [
    //   { header: 'IDA', binding: 'idA' },
    //   { header: 'Full NameAA', binding: 'name' }
    // ];
  }

  private _getData() {
    // create some random data
    let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
        data = [];
    for (let i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }

    return data;
}
}