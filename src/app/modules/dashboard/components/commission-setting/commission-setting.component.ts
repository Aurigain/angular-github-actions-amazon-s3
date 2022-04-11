import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';


type State = {id: number, name: string};

const states: State[] = [
  {id: 0, name: 'Alabama'},
  {id: 1, name: 'Alaska'},
  {id: 2, name: 'American Samoa'},
  {id: 3, name: 'Arizona'},
  {id: 4, name: 'Arkansas'},
  {id: 5, name: 'California'},
  {id: 6, name: 'Colorado'},
  {id: 7, name: 'Connecticut'},
  {id: 8, name: 'Delaware'},
  {id: 9, name: 'District Of Columbia'},
  {id: 10, name: 'Federated States Of Micronesia'},
  {id: 11, name: 'Florida'},
  {id: 12, name: 'Georgia'},
  {id: 13, name: 'Guam'},
  {id: 14, name: 'Hawaii'},
  {id: 15, name: 'Idaho'},
  {id: 16, name: 'Illinois'},
  {id: 17, name: 'Indiana'},
  {id: 18, name: 'Iowa'},
  {id: 19, name: 'Kansas'},
  {id: 20, name: 'Kentucky'},
  {id: 21, name: 'Louisiana'},
  {id: 22, name: 'Maine'},
  {id: 23, name: 'Marshall Islands'},
  {id: 24, name: 'Maryland'},
  {id: 25, name: 'Massachusetts'},
  {id: 26, name: 'Michigan'},
  {id: 27, name: 'Minnesota'},
  {id: 28, name: 'Mississip*pi'},
  {id: 29, name: 'Missouri'},
  {id: 30, name: 'Montana'},
  {id: 31, name: 'Nebraska'},
  {id: 32, name: 'Nevada'},
  {id: 33, name: 'New Hampshire'},
  {id: 34, name: 'New Jersey'},
  {id: 35, name: 'New Mexico'},
  {id: 36, name: 'New York'},
  {id: 37, name: 'North Carolina'},
  {id: 38, name: 'North Dakota'},
  {id: 39, name: 'Northern Mariana Islands'},
  {id: 40, name: 'Ohio'},
  {id: 41, name: 'Oklahoma'},
  {id: 42, name: 'Oregon'},
  {id: 43, name: 'Palau'},
  {id: 44, name: 'Pennsylvania'},
  {id: 45, name: 'Puerto Rico'},
  {id: 46, name: 'Rhode Island'},
  {id: 47, name: 'South Carolina'},
  {id: 48, name: 'South Dakota'},
  {id: 49, name: 'Tennessee'},
  {id: 50, name: 'Texas'},
  {id: 51, name: 'Utah'},
  {id: 52, name: 'Vermont'},
  {id: 53, name: 'Virgin Islands'},
  {id: 54, name: 'Virginia'},
  {id: 55, name: 'Washington'},
  {id: 56, name: 'West Virginia'},
  {id: 57, name: 'Wisconsin'},
  {id: 58, name: 'Wyoming'}
];

@Component({
  selector: 'app-commission-setting',
  templateUrl: './commission-setting.component.html',
  styleUrls: ['./commission-setting.component.scss']
})
export class CommissionSettingComponent implements OnInit {

  supervisors = ['Naina', 'Sunaina', 'Arpit', 'Manish', 'Durgesh'];
  selectAgentForm: FormGroup;
  employeeSpecific: FormGroup;
  reportingSpecificForm: FormGroup;
  locationSpecificForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder
  ) { }
  
  originalArray = [
    {Id: 10018, FullName: 'Yishu', FatherName: 'Tetzzy', Email: 'yishu@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00',},
    {Id: 10017, FullName: 'Yishu Arora', FatherName: 'heeheh', Email: 'YishuArora@gmail.com', type: 'rejected',DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10016, FullName: 'Mohit', FatherName: 'bzbzjz', Email: 'mohit@gmail.com', type: 'pending',DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10015, FullName: 'gg', FatherName: 'yhg', Email: 'gg@gmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10014, FullName: 'pinkj', FatherName: 'mohan', Email: 'pinkj@gmail.com',type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10013, FullName: 'shhddh', FatherName: 'bsbdbdb', Email: null, type: 'approved',DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10012, FullName: 'JR Sachin', FatherName: 'SR Sachin', Email: 'sachin123@yopmail.com', type: 'approved', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10011, FullName: 'testui', FatherName:  'gh', Email: null, type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10010, FullName: 'vasb', FatherName: 'bbbb', Email: null, type: 'pending', DateOfBirth: '0001-01-01T00:00:00', },
    {Id: 10009, FullName: 'Aashish Jain', FatherName: 'Ashok Kumar',  Email: 'aashish@gmail.com', type: 'rejected', DateOfBirth: '0001-01-01T00:00:00', },
  
    ];

  public model: State;
  filteredUsers = [];

  // formatter = (state: State) => state.name;

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(text => text.length < 1 ? []
      : this.filteredUsers.length>0 ? this.filteredUsers.filter(v => v.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, 10) : ['No Exam Found'])
  )

  detectUser(obj: any) {
    this.filteredUsers = [];
    var text = obj.target.value;
    for (let i = 0; i < this.originalArray.length; i++) {
      if (this.originalArray[i]['FullName'].toLowerCase().includes(text.toLowerCase())) {
        this.filteredUsers.push(this.originalArray[i]['FullName']);
      }
    }
  }

  submitReportingSpecificForm(){}

  get selectAgent(){
    return this.employeeSpecific.get('selectAgent');
  }
  get existingCommission(){
    return this.employeeSpecific.get('existingCommission');
  }
  get commissionPercentage(){
    return this.employeeSpecific.get('commissionPercentage');
  }

  get reportingPersonName(){
    return this.reportingSpecificForm.get('reportingPersonName');
  }
  get rNewCommissionRate(){
    return this.reportingSpecificForm.get('newCommissionRate');
  }
  get rStartDate(){
    return this.reportingSpecificForm.get('startDate');
  }
  get rEndDate(){
    return this.reportingSpecificForm.get('endDate');
  }
  
  get lPinCode(){
    return this.locationSpecificForm.get('pinCode');
  }
  get lNewCommissionRate(){
    return this.locationSpecificForm.get('newCommissionRate');
  }
  get lStartDate(){
    return this.locationSpecificForm.get('startDate');
  }
  get lEndDate(){
    return this.locationSpecificForm.get('endDate');
  }

  submitEmployeeSpecific(){
    const selectAgent = this.employeeSpecific.value.selectAgent.name;
    const existingCommission = this.employeeSpecific.value.existingCommission;
    const commissionPercentage = this.employeeSpecific.value.commissionPercentage;

    let finalData = {
      selectAgent: selectAgent,
      existingCommission: existingCommission,
      commissionPercentage: commissionPercentage
    }

    console.log(finalData);
  }

  submitLocationSpecificForm(){
    
  }
  ngOnInit(): void {

    this.employeeSpecific = this.formbuilder.group({
      selectAgent: ['', Validators.required],
      existingCommission: [''],
      commissionPercentage: ['', Validators.required]
    })
    
    this.reportingSpecificForm = this.formbuilder.group({
      reportingPersonName: ['', Validators.required],
      newCommissionRate: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })

    this.locationSpecificForm = this.formbuilder.group({
      state: [''],
      district: [''],
      city: [''],
      pinCode: ['', Validators.required],
      newCommissionRate: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    })
  }

}
