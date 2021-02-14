import { Component, ElementRef, VERSION, ViewChild } from "@angular/core";
import { POSTS_ARRAY } from "../assets/posts-array.data";
import { POSTS } from "../assets/posts.data";
import { EventService } from "./event.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  dataSource = POSTS;
  dataSourceArray = POSTS_ARRAY;
  columnsToDisplay = ["userId", "id", "title"];
  arrayColumnFormat = ["userId", "id", "title", "body"];
}
