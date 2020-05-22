import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {MatFormFieldModule} from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MyTableComponent } from './components/my-table/my-table.component'
import { InputComponent } from './components/input/input.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { CardComponent } from './components/card/card.component'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { FetchEffects } from "./store/store.effects"
import { GithubService } from "./services/github.service"
import { metaReducers, reducers, State } from "./redusers"
import { PreloaderComponent } from './components/preloader/preloader.component'
import { CardErrorNotificationComponent } from './components/error-notification/error-notification.component'



@NgModule({
  declarations: [
    AppComponent,
    MyTableComponent,
    InputComponent,
    ToolbarComponent,
    CardComponent,
    PreloaderComponent,
    CardErrorNotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([FetchEffects]),
    EffectsModule.forFeature(),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
