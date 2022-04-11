import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/config/constants.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  Roles:any = ['supervisor', 'client', 'agent'];

  constructor(
    private formbuilder: FormBuilder,
    private conts: ConstantsService,
  ) {
    this.tabelData = [];
   }
  currentStep: number = 1; 
  statusDetails: FormGroup;
  personalDetails: FormGroup;
  documentDetails: FormGroup;
  jewelleryDetails: FormGroup;
  appointmentDetails: FormGroup;
  tabelData:any
  ngOnInit(): void {
    this.statusDetails = this.formbuilder.group({
      status: ['', [Validators.required,]]
    })
  }

  saveStatusDetails(){
    
    const status = this.statusDetails.value.status;

    let formData = {
      status: status
    }

    console.log(formData);
    this.stepUp();
    this.personalDetails = this.formbuilder.group({
      
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z\-\']+")]],
      email: ['', [Validators.required, Validators.pattern(this.conts.EMAIL_REGEXP)]],
      phone: ['', [Validators.required, Validators.pattern(this.conts.PHONE.pattern)]],
      address: ['', [Validators.required,]],
      role: ['', [Validators.required,]]
    })
  }

  stepUp(){
    console.log("clicked")
    this.currentStep +=1;
    console.log(this.currentStep);
  }
  stepDown(){
    this.currentStep-=1;
    console.log(this.currentStep);
  }

  addJewellery(){
    // const jewelleryType = this.jewelleryDetails.value.jewelleryType;
    // const quantity = this.jewelleryDetails.value.quantity;
    // const weight = this.jewelleryDetails.value.weight;
    // const karats = this.jewelleryDetails.value.karats;

    this.tabelData.push(this.jewelleryDetails.value);
    this.jewelleryDetails.reset();

  }

  removeItem(item){
    this.tabelData.forEach((value, index) => {
      if(value == item){
        this.tabelData.splice(index,1)
      }
    })
  }

  savePersonalDetails(){
    this.stepUp();
    console.log("inside save personal details")
    let personalDetailData:any;
    
    const name = this.personalDetails.value.name;
    const email = this.personalDetails.value.email;
    const phone = this.personalDetails.value.phone;
    const address = this.personalDetails.value.address;
    const role = this.personalDetails.value.role;


    personalDetailData = {
      
      name: name,
      email: email,
      phone: phone,
      address: address,
      role: role
   }

    console.log(personalDetailData);
    this.jewelleryDetails = this.formbuilder.group({
      jewelleryType: ['', [Validators.required,]],
      quantity: ['', [Validators.required]],
      weight: ['', [Validators.required,]],
      karats: ['', [Validators.required,]],
    })
    
    // this.documentDetails = this.formbuilder.group({
    //   documentType: ['', [Validators.required,]],
    //   documentNumber: ['', [Validators.required]],
    //   panNumber: ['', [Validators.required,]],
    //   pinCode: ['', [Validators.required,]],
    //   areaName: ['', [Validators.required,]],
    //   addressLine1: ['', [Validators.required,]],
    //   addressLine2: ['', [Validators.required,]],
    // })
  }
  
  // saveDocumentDetails(){
  //   this.stepUp();
  //   console.log("inside save document details")
  //   let documentDetailData:any;
  //   const documentType = this.documentDetails.value.documentType;
  //   const documentNumber = this.documentDetails.value.documentNumber;
  //   const panNumber = this.documentDetails.value.panNumber;
  //   const pinCode = this.documentDetails.value.pinCode;
  //   const areaName = this.documentDetails.value.areaName;
  //   const addressLine1 = this.documentDetails.value.addressLine1;
  //   const addressLine2 = this.documentDetails.value.addressLine2;

  //   documentDetailData = {
  //     documentType: documentType,
  //     documentNumber: documentNumber,
  //     panNumber: panNumber,
  //     pinCode: pinCode,
  //     areaName: areaName,
  //     addressLine1: addressLine1,
  //     addressLine2: addressLine2,
      
  //   }
  //   console.log(documentDetailData);

    
  // }

  saveJewelleryDetails(){
    this.stepUp();
    console.log(this.tabelData);
    
    this.appointmentDetails = this.formbuilder.group({
      branch: ['', [Validators.required,]],
      dateOfAppointment: ['', [Validators.required]],
      timeOfAppointment: ['', [Validators.required,]],
    })
  }

  saveForms(){

    const name = this.personalDetails.value.name;
    const email = this.personalDetails.value.email;
    const phone = this.personalDetails.value.phone;
    const address = this.personalDetails.value.address;
    const role = this.personalDetails.value.role;

  const documentType = this.documentDetails.value.documentType;
  const documentNumber = this.documentDetails.value.documentNumber;
  const panNumber = this.documentDetails.value.panNumber;
  const pinCode = this.documentDetails.value.pinCode;
  const areaName = this.documentDetails.value.areaName;
  const addressLine1 = this.documentDetails.value.addressLine1;
  const addressLine2 = this.documentDetails.value.addressLine2;

  const branch = this.appointmentDetails.value.branch;
  const dateOfAppointment= this.appointmentDetails.value.dateOfAppointment;
  const timeOfAppointment = this.appointmentDetails.value.timeofAppointment;

  let finalData= {
    name: name,
    email: email,
    phone: phone,
    address: address,
    role: role,

  documentType: documentType,
  documentNumber: documentNumber,
  panNumber: panNumber,
  pinCode: pinCode,
  areaName: areaName,
  addressLine1: addressLine1,
  addressLine2: addressLine2,

  jewelleryDetails: this.tabelData,

  branch: branch,
  dateOfAppointment: dateOfAppointment,
  timeOfAppointment: timeOfAppointment,
  }
  console.log("final form data", finalData);
  }
}
