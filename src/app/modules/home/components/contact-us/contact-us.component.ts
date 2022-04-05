import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/config/constants.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
  ) { }
  
  contactUs(){
    const name = this.contactForm.value.name;
    const email = this.contactForm.value.email;
    const query = this.contactForm.value.query;
    const phone = this.contactForm.value.phone;
    const message = this.contactForm.value.message;
    
    const formData = {
      name: name,
      email: email,
      query: query,
      phone: phone,
      message: message
    }

    console.log(formData);
  }

  get name(){
    return this.contactForm.get('name');
  }
  get email(){
    return this.contactForm.get('email');
  }
  get phone(){
    return this.contactForm.get('phone');
  }
  get message(){
    return this.contactForm.get('message');
  }

  ngOnInit(): void {

    this.contactForm = this.formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      email: ['',[Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      query: ['',],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      message: ['', [Validators.required,]],
    })
  }

}
