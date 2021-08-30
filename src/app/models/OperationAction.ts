export enum OperationAction {
    Add = 'add',
    Multiply = 'multiply',
}

export function operationActionStr(action: OperationAction) {
    switch (action) {
        case OperationAction.Add: {
            return '+'
        }
        case OperationAction.Multiply: {
            return '*'
        }
        default: {
            throw new Error('invalid action')
        }
    }
}