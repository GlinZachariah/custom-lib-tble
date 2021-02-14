import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { MatCardModule } from "@angular/material/card";
import { HttpClientModule } from "@angular/common/http";
import { EventService } from './event.service';
import { TableComponent } from './table/table.component';
@NgModule({
  imports: [BrowserModule, FormsModule, MatCardModule, HttpClientModule],
  declarations: [AppComponent, TableComponent],
  bootstrap: [AppComponent],
  providers: [EventService]
})
export class AppModule {}
