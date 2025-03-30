import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArgumentComponent } from './argument.component';

jest.mock('casper-rust-wasm-sdk', () => ({
  CLType: jest
    .fn()
    .mockImplementation(() => ({ U8: jest.fn().mockResolvedValue('U8') })),
}));

describe.skip('ArgumentComponent', () => {
  let component: ArgumentComponent;
  let fixture: ComponentFixture<ArgumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArgumentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArgumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
