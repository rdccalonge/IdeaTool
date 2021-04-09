import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { QuestionsComponent } from './questions/questions.component';
import { FilterArrayPipe} from './filters/filter.pipe';
import { SelectOneComponent } from './questions/types/select-one/select-one.component';
import { GridComponent } from './questions/types/grid/grid.component';
import { ChartsModule } from 'ng2-charts';
// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    QuestionsComponent,
    FilterArrayPipe,
    SelectOneComponent,
    GridComponent
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
