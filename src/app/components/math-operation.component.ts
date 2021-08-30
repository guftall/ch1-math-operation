import { Component, OnInit } from '@angular/core'
import { MathOperationService } from '../services/math-operation.service'

@Component({
    selector: 'math-operation',
    templateUrl: './math-operation.component.html',
    styleUrls: ['./math-operation.component.css']
})
export class MathOperationComponent implements OnInit {

    operations: string[] = []

    constructor(private operationService: MathOperationService) { }

    ngOnInit(): void {
        this.loadNumbers()
    }
    loadNumbers() {
        this.operations.splice(0)
        this.operationService.getOperations()
            .subscribe(str => {
                this.operations.push(str)
            })
    }
}
