import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicApi } from './public-api';

describe('PublicApi', () => {
  let component: PublicApi;
  let fixture: ComponentFixture<PublicApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
