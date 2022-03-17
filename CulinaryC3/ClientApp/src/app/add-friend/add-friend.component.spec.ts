/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AddFriendComponent } from './add-friend.component';

let component: AddFriendComponent;
let fixture: ComponentFixture<AddFriendComponent>;

describe('addFriend component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddFriendComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AddFriendComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});