import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypebarComponent } from './typebar.component';

describe('TypebarComponent', () => {
  let component: TypebarComponent;
  let fixture: ComponentFixture<TypebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TypebarComponent]
    });
    fixture = TestBed.createComponent(TypebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
