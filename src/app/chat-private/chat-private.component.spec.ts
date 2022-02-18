import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPrivateComponent } from './chat-private.component';

describe('ChatPrivateComponent', () => {
  let component: ChatPrivateComponent;
  let fixture: ComponentFixture<ChatPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
