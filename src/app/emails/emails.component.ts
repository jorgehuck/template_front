import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { OrigenService } from '../services/origen.service';
import { Email } from '../contracts/interfaces/email';
import { Origen } from '../contracts/interfaces/origen';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
})
export class EmailsComponent implements OnInit {
  emails: Email[] = [];
  origenes: Origen[] = [];

  dataSource = this.emails;
  displayedColumns: string[] = ['email', 'createdAt', 'origen'];

  constructor(
    private emailService: EmailService,
    private origenService: OrigenService
  ) {}

  ngOnInit(): void {
    this.getEmails();

    console.log('call getEmail(1)');
    this.getEmail(4);

    // obtengo los origenes
    this.getOrigenes();
  }

  /**
   * Obtiene un listado de emails
   */
  getEmails(): void {
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
      console.log(emails);
    });
  }

  /**
   * Obtiene un email único
   */
  getEmail(id: number): void {
    this.emailService.getEmail(id).subscribe((email) => {
      console.log(email);
    });
  }

  /**
   * Obtiene un listado de origenes
   */
  getOrigenes(): void {
    this.origenService.getOrigenes().subscribe((origenes) => {
      this.origenes = origenes;
      console.log(origenes);
    });
  }
}
