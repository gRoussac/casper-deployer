import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgBuilderComponent } from './arg-builder.component';
import { DeployerService } from '@casper-data/data-access-deployer';

describe('ArgBuilderComponent', () => {
  let component: ArgBuilderComponent;
  let fixture: ComponentFixture<ArgBuilderComponent>;

  const getState = jest.fn().mockReturnValue({ subscribe: jest.fn() });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArgBuilderComponent],
      providers: [{ provide: DeployerService, useValue: { getState } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArgBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
