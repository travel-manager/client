import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {

  contacts: Contact[]

  constructor(private contactService: ContactService) { }

  ngOnInit() {
     this.contactService
      .getContacts()
      .then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
          return contact;
        });
      });
  }

  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  createNewContact() {
    var contact: Contact = {
      firstname: '',
      lastname: '',
      username: '',
      password: ''
      };
    }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    return this.contacts;
  }
}
