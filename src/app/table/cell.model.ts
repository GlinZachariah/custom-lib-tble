export class TableCell {
  rowspan: number;
  colspan: number;
  constructor(public value: any) {}
}

export class Pages {
  [pageid: number]: Array<TableCell[]>;
  constructor(pageid: number) {}
}
