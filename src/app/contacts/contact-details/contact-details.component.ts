import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent {
  @Input()
  createHandler: Function;

  constructor (private contactService: ContactService) {}

  createContact(contact: Contact) {
    /* var contact: Contact = {
      firstname: 'Teuvo',
      lastname: 'Toinen',
      username: 'Toka',
      password: '12345'
      }; */
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }
}
