import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header'; // ✅ Correct class name

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]  // ✅ It's a standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // ✅ Verifies the component is initialized
  });
});
