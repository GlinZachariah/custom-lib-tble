import { Component, Input, OnInit } from "@angular/core";
import { Pages, TableCell } from "./cell.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  @Input() dataSource: Array<any> | Array<Array<any>>;
  @Input() columnsToDisplay: Array<string>;
  @Input() arrayColumnFormat: Array<string>;
  @Input() pageSize: number;

  headers: TableCell[];
  rows: Array<TableCell[]>;
  dataSize: number;
  currentPage = 0;
  lastPage: number;

  pages: Pages;

  actualColumnSize: number;
  columnsSize: number;

  matchedColumnPosition: Array<number>;

  conditionValid = false;
  constructor() {
    this.headers = [];
    this.rows = [];
    this.pages = new Pages(0);
  }

  ngOnInit() {
    if (this.dataSource && this.columnsToDisplay) {
      this.dataSize = this.dataSource.length;
      this.columnsSize = this.columnsToDisplay.length;
      this.pageSize = this.pageSize ? this.pageSize : this.dataSize;

      if (this.pageSize != this.dataSize) this.conditionValid = true;
      this.createPages();
    }
  }

  setMatchedColumnPositions() {
    let idx = 0;
    this.columnsToDisplay.forEach(col => {
      if (this.arrayColumnFormat.filter(disp => disp == col).length > 0) {
        this.matchedColumnPosition.push(this.arrayColumnFormat.indexOf(col));
      }
      idx += 1;
    });
  }

  parseDataSource(dataSource): Array<TableCell[]> {
    //adding the rows
    let currentRow = [];
    if (dataSource[0] instanceof Array) {
      let aColumnSize = dataSource[0].length;
      this.matchedColumnPosition = [];
      this.setMatchedColumnPositions();
      //already as an array

      for (let j = 0; j < dataSource.length; j++) {
        let arr: TableCell[] = [];
        for (let i = 0; i < this.matchedColumnPosition.length; i++) {
          arr.push(new TableCell(dataSource[j][this.matchedColumnPosition[i]]));
        }
        currentRow.push(arr);
      }
      return currentRow;
    } else {
      // create data from json
      for (let i = 0; i < dataSource.length; i++) {
        let arr = [];
        for (let j = 0; j < this.columnsSize; j++) {
          arr.push(new TableCell(dataSource[i][this.columnsToDisplay[j]]));
        }
        currentRow.push(arr);
      }
      return currentRow;
    }
  }

  createPages() {
    // adding the header data
    for (let i = 0; i < this.columnsSize; i++) {
      this.headers.push(new TableCell(this.columnsToDisplay[i]));
    }
    let idx = 0;
    for (let page = 0; page < this.dataSize; page += this.pageSize) {
      // for each page
      this.pages[idx] = this.parseDataSource(
        this.dataSource.slice(page, page + this.pageSize)
      );
      idx += 1;
    }
    this.lastPage = idx - 1;

    this.rows = this.pages[this.currentPage];
  }

  goTo(page: number) {
    if (page >= 0 && page <= this.lastPage) {
      this.currentPage = page;
      this.rows = this.pages[page];
    }
  }
}
