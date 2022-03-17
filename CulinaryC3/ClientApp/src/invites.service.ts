import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Invites } from './invites';


@Injectable()
export class InvitesService {
    base: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.base = baseUrl + "Culinary";
  }

  getInvites(userId: number) {
    let url: string = this.base + `/Invites/U=${userId}`;
    return this.http.get<Invites[]>(url);
  }

  sendInvite(inviteeId: number, inviterEmail: string, groupName: string) {
    let url: string = this.base + `/NewInvite/U=${inviteeId}&O=${inviterEmail}&N=${groupName}`
    return this.http.post<Invites>(url, {}).subscribe((result) => console.log(result));
  }

  removeInvite(name: string, userId: number) {
    let url: string = this.base + `/removeI=${name}&u=${userId}`;
    return this.http.delete<Invites>(url).subscribe(result => { console.log(result) });
  }
}
