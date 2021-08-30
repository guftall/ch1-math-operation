import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { OperationWrapper } from '../models/OperationWrapper'
import { Operand } from '../models/Operand'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { MessageService } from './message.service'
import { MissingDataError } from '../models/MissingDataError'

@Injectable()
export class ApiService {
    private apiUrl = '/assets'
    constructor(
        private httpClient: HttpClient,
        private messageService: MessageService) { }
    getNumbers() {
        return this.httpClient.get<OperationWrapper[]>(`${this.apiUrl}/numbers.json`)
            .pipe(catchError(err => this.handleError(err, 'numbers')))
    }
    getOperationOperand(operation: string) {
        return this.httpClient.get<Operand>(`${this.apiUrl}/${operation}.json`)
            .pipe(catchError(err => this.handleError(err, 'action')))
    }
    private handleError(err: HttpErrorResponse, name?: string) {
        if (err.status == 404) {
            if (name == 'numbers') {
                this.messageService.open('Server Error')
            } else if (name == 'action') {
                return throwError(new MissingDataError())
            }
        }

        return throwError(err)
    }
}
