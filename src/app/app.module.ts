import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { MathOperationComponent } from './components/math-operation.component'
import { MathOperationService } from './services/math-operation.service'
import { MessageService } from './services/message.service'
import { ApiService } from './services/api.service'

@NgModule({
  declarations: [
    AppComponent,
    MathOperationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    MathOperationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
