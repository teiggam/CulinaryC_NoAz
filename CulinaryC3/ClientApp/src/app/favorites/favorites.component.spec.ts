/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FavoritesComponent } from './favorites.component';

let component: FavoritesComponent;
let fixture: ComponentFixture<FavoritesComponent>;

describe('favorites component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FavoritesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FavoritesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});