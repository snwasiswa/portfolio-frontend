import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../../core/services/contact/contact.service';
import { MessageService } from 'primeng/api';
// PrimeNG components for standalone usage
import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Message } from 'primeng/message';
import { ContactFormModel } from '../../core/models/contact/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  providers: [MessageService],
  imports: [

    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,

    // PrimeNG components
    InputText,
    InputTextarea,
    ButtonModule,
    Button,
    Toast,
    Message // Added this to enable p-message
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup<ContactFormModel>;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService
  ) {
    this.contactForm = this.fb.group({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl<string | null>(null, [
  Validators.required,
  Validators.pattern(/^\+?\d{10,15}$/)
]),

      subject: new FormControl<string | null>(null),
      message: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.submitContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Message Sent',
            detail: 'Your message has been submitted successfully.'
          });
          this.contactForm.reset();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong. Please try again.'
          });
          console.error('Error submitting form:', error);
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Form Invalid',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}
