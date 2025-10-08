import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../../core/services/contact/contact.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ContactFormModel } from '../../core/models/contact/contact.model';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../core/models/profile/profile.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Message } from 'primeng/message';
import { NgxIntlTelInputModule, PhoneNumberFormat, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-contact',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,

    // PrimeNG components
    InputText,
    InputTextarea,
    ButtonModule,
    Button,
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

  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  selectedCountryISO: CountryISO = CountryISO.UnitedStates;

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
      phone: new FormControl(null, [Validators.required]), // ngx-intl-tel-input handles validation
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
        ...this.contactForm.value,
        phone: this.contactForm.value.phone?.internationalNumber || '' // Extract formatted phone number
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
