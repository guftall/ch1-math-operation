import { marbles } from 'rxjs-marbles/jasmine'
import { MissingDataError } from '../models/MissingDataError'
import { OperationAction } from '../models/OperationAction'
import { MathOperationService } from './math-operation.service'

describe('MathOperationService', () => {

    let apiServiceSpy: { getNumbers: jasmine.Spy, getOperationOperand: jasmine.Spy }
    let mathOperationService: MathOperationService

    beforeEach(() => {
        apiServiceSpy = jasmine.createSpyObj('HttpClient', ['getNumbers', 'getOperationOperand'])
        mathOperationService = new MathOperationService(apiServiceSpy as any)
    })

    describe('operationString', () => {

        [
            [1, 2, OperationAction.Add, '1 + 2 = 3'],
            [1, 2, OperationAction.Multiply, '1 * 2 = 2'],
            [2, 1, OperationAction.Multiply, '2 * 1 = 2']
        ].forEach(([a, b, action, expectedResult]) => {

            it(`should return proper string for ${a} ${action} ${b}`, () => {
                expect(mathOperationService.operationString(a as number, b as number, action as OperationAction))
                    .toBe(expectedResult as string)
            })
        })
    })

    describe('getOperations', () => {

        it('should do marbles', marbles(m => {

            const numbers = [
                { value: 1, action: OperationAction.Add },
                { value: 2, action: OperationAction.Multiply },
            ]

            const numbersSource = m.cold('   a|', { a: numbers })
            const operationsSource = m.cold('b----c---|', { b: { value: 3 }, c: { value: 4 } })
            const expected = m.hot('        (de)-(fg)|)', { d: '1 + 3 = 4', e: '2 * 3 = 6', f: '1 + 4 = 5', g: '2 * 4 = 8' })


            apiServiceSpy.getNumbers.and.returnValue(numbersSource)
            apiServiceSpy.getOperationOperand.and.returnValue(operationsSource)

            let destination = mathOperationService.getOperations()
            m.expect(destination).toBeObservable(expected)
        }))
        it('should handle missed action file', marbles(m => {

            const numbers = [
                { value: 1, action: OperationAction.Add },
                { value: 2, action: OperationAction.Multiply },
            ]

            const numbersSource = m.cold('   a---|', { a: numbers })
            const operationsSource = m.cold('#|', {}, new MissingDataError())
            const expected = m.hot('         (dd)|', { d: 'MISSING DATA' })

            apiServiceSpy.getNumbers.and.returnValue(numbersSource)
            apiServiceSpy.getOperationOperand.and.returnValue(operationsSource)

            let destination = mathOperationService.getOperations()
            m.expect(destination).toBeObservable(expected)
        }))
    })
})