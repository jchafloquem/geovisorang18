import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabContainerBottomComponent } from './fab-container-bottom.component';

describe('FabContainerBottomComponent', () => {
  let component: FabContainerBottomComponent;
  let fixture: ComponentFixture<FabContainerBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabContainerBottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabContainerBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
