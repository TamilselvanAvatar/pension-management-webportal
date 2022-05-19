import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePensionerComponent } from './delete-pensioner.component';

describe('DeletePensionerComponent', () => {
  let component: DeletePensionerComponent;
  let fixture: ComponentFixture<DeletePensionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePensionerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePensionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
