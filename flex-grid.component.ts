import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CollectionView } from '@grapecity/wijmo';
import { WjGridModule, WjFlexGrid } from '@grapecity/wijmo.angular2.grid'; // Import WjFlexGrid

@Component({
  selector: 'app-flex-grid',
  standalone: true,
  imports: [WjGridModule,CommonModule],
  templateUrl: './flex-grid.component.html',
  styleUrls: ['./flex-grid.component.css']
})
export class FlexGridComponent implements OnChanges {
  @Input() data: any[] = []; // Input for grid data
  @Input() columns: { header: string, binding: string }[] = []; // Input for column definitions
  @Input() rows: number = 0; // Input for number of rows

  @ViewChild('flexGrid') flexGrid!: WjFlexGrid; // Reference to the FlexGrid

  collectionView: CollectionView;

  constructor() {
    this.collectionView = new CollectionView<any>([]); // Initialize with empty data
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns']) {
      // Update the CollectionView with the new data
      this.collectionView = new CollectionView(this.data);
      if (this.rows > 0) {
        this.collectionView.pageSize = this.rows;
      }

      // Auto-size columns after data or columns change
      setTimeout(() => {
        if (this.flexGrid) {
          this.flexGrid.autoSizeColumns(); // Auto-size columns based on data and headers
        }
      });
    }
  }
}