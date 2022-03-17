/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AccountSettingsComponent } from './account-settings.component';

let component: AccountSettingsComponent;
let fixture: ComponentFixture<AccountSettingsComponent>;

describe('AccountSettings component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AccountSettingsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AccountSettingsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});