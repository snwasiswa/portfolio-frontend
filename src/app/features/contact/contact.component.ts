import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact/contact.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../core/models/profile/profile.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

// PrimeNG UI modules
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-contact',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // PrimeNG components
    InputText,
    Textarea,
    ButtonModule,
    Toast,
    Message,
    SafeHtmlPipe
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  profile!: Profile;
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService,
    private profileService: ProfileService
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
      subject: new FormControl(''),
      message: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.profile = data[0];
        } else {
          console.warn('No profile data found.');
        }
      },
      error: (err) => console.error('Error loading profile', err)
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const payload = {
        ...this.contactForm.value
      };

      this.contactService.submitContactForm(payload).subscribe({
        next: () => {
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
