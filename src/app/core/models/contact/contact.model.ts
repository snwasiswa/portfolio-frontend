import { FormControl } from "@angular/forms";

export interface ContactFormModel {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string | null>;
  subject: FormControl<string | null>;
  message: FormControl<string>;
}
