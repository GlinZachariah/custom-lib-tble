import { Component, Input, OnInit } from "@angular/core";
import { TableCell } from "./cell.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  @Input() dataSource: Array<any> | Array<Array<any>>;
  @Input() columnsToDisplay: Array<string>;
  @Input() arrayColumnFormat: Array<string>;
  headers: TableCell[];
  rows: Array<TableCell[]>;
  dataSize: number;

  actualColumnSize: number;
  columnsSize: number;

  matchedColumnPosition: Array<number>;

  conditionValid = false;
  constructor() {
    this.headers = [];
    this.rows = [];
  }

  ngOnInit() {
    if (this.dataSource && this.columnsToDisplay) {
      this.dataSize = this.dataSource.length;
      this.columnsSize = this.columnsToDisplay.length;
      this.parseDataSource();
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

  parseDataSource() {
    // adding the header data
    for (let i = 0; i < this.columnsSize; i++) {
      this.headers.push(new TableCell(this.columnsToDisplay[i]));
    }

    //adding the rows
    if (this.dataSource[0] instanceof Array) {
      this.actualColumnSize = this.dataSource[0].length;
      this.matchedColumnPosition = [];
      this.setMatchedColumnPositions();
      //already as an array

      for (let j = 0; j < this.dataSize; j++) {
        let arr: TableCell[] = [];
        for (let i = 0; i < this.matchedColumnPosition.length; i++) {
          arr.push(
            new TableCell(this.dataSource[j][this.matchedColumnPosition[i]])
          );
        }
        this.rows.push(arr);
      }
      // console.log(this.headers);
      // console.log(this.rows);
    } else {
      for (let i = 0; i < this.dataSize; i++) {
        let arr = [];
        for (let j = 0; j < this.columnsSize; j++) {
          arr.push(new TableCell(this.dataSource[i][this.columnsToDisplay[j]]));
        }
        this.rows.push(arr);
      }
    }
  }
}
