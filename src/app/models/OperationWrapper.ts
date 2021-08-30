import { OperationAction } from './OperationAction'

export class OperationWrapper {
    value: number
    action: OperationAction
    constructor(value: number, action: OperationAction) {
        this.value = value
        this.action = action
    }
}