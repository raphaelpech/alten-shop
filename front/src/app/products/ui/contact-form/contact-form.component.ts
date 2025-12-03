import { Component, viewChild } from '@angular/core';
import { InputTextModule } from "primeng/inputtext";
import { Message } from 'app/products/data-access/message.model';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ButtonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  success = false;
  editedMessage: Message = { email: '', message: '' };

  public onSend(form: NgForm) {
    if (!form) {
      return
    };
    const { email, message } = form.value;
    this.editedMessage = { email, message };
    form.resetForm();
    this.success = true;
  }

}
