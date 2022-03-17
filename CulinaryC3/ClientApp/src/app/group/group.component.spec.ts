/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { GroupComponent } from './group.component';
let component: GroupComponent;
let fixture: ComponentFixture<GroupComponent>;
describe('group component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupComponent],
      imports: [BrowserModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
  }));
  it('should do something', async(() => {
    expect(true).toEqual(true);
  }));
});
