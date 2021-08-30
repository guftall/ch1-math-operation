import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { OperationWrapper } from '../models/OperationWrapper'
import { Operand } from '../models/Operand'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'
import { MessageService } from './message.service'
import { MissingDataError } from '../models/MissingDataError'
import { OperationAction, operationActionStr } from '../models/OperationAction'
import { ApiService } from './api.service'

@Injectable()
export class MathOperationService {
    private apiUrl = '/assets'
    constructor(private apiService: ApiService) { }

    getOperations(): Observable<string>{
        return this.apiService.getNumbers()
        .pipe(
            mergeMap(n => n),
            mergeMap(({ value, action }) => this.apiService.getOperationOperand(action)
                .pipe(
                    map(operand => this.operationString(value, operand.value, action)),
                    catchError(err => {
                        if (err instanceof MissingDataError) {
                            return of(err.message)
                        }

                        return throwError(err)
                    })))
        )
    }
    operationString(a: number, b: number, action: OperationAction): string {

        let mathRes = this.calculateMathOperationResult(a, b, action)

        return `${a} ${operationActionStr(action)} ${b} = ${mathRes}`
    }
    private calculateMathOperationResult(a: number, b: number, action: OperationAction) {
        switch (action) {
            case OperationAction.Add: {
                return a + b
            }
            case OperationAction.Multiply: {
                return a * b
            }
            default: {
                throw new Error('invalid action')
            }
        }
    }
}
