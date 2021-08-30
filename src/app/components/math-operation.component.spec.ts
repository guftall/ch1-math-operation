import { TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { MathOperationService } from '../services/math-operation.service'
import { MathOperationComponent } from './math-operation.component'

describe('MathOperationComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatCardModule,
            ],
            providers: [
                {
                    provide: MathOperationService,
                    useValue: jasmine.createSpyObj('MathOperationService', ['getOperations'])
                }
            ],
            declarations: [
                MathOperationComponent
            ],
        }).compileComponents()
    })

    it(`should load numbers from service`, () => {

        let mathOpServiceSpy = TestBed.inject(MathOperationService) as jasmine.SpyObj<MathOperationService>
        mathOpServiceSpy.getOperations.and.returnValue(of('a'))

        const fixture = TestBed.createComponent(MathOperationComponent)

        const mathOp = fixture.componentInstance
        mathOp.loadNumbers()
        expect(mathOp.operations[0]).toEqual('a')
    })

    it('should render operation', () => {
        let mathOpServiceSpy = TestBed.inject(MathOperationService) as jasmine.SpyObj<MathOperationService>
        const operation = '1 + 2 = 3'
        mathOpServiceSpy.getOperations.and.returnValue(of(operation))

        const fixture = TestBed.createComponent(MathOperationComponent)
        fixture.detectChanges()
        const compiled = fixture.nativeElement as HTMLElement
        expect(compiled.querySelector('.card')?.textContent).toContain(operation)
    })
})
