import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class MessageService {
    constructor(private snackBAr: MatSnackBar) { }

    open(message: string) {
        this.snackBAr.open(message, undefined, {
            duration: 1500,
        })
    }
}
