import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-commission-reversal',
  templateUrl: './commission-reversal.component.html',
  styleUrls: ['./commission-reversal.component.scss']
})
export class CommissionReversalComponent implements OnInit {

  supervisors = [
    {id:1, name: 'Naina', currentCommissionPercentage: '5'}, 
    {id:2, name: 'Sunaina', currentCommissionPercentage: '15'}, 
    {id:3, name: 'Arpit', currentCommissionPercentage: '10'}, 
    {id:4, name:'Manish', currentCommissionPercentage: '5'}, 
    {id:5, name: 'Durgesh', currentCommissionPercentage: '10'}
  ];
  selectAgentForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder
  ) { }


  get agent(){
    return this.selectAgentForm.get('selectAgent');
  }
  get newCommissionPercentage(){
    return this.selectAgentForm.get('currentCommissionPercentage');
  }
  get currentCommissionPercentage(){
    return this.selectAgentForm.get('newCommissionPercentage');
  }

  getSupervisorData(){
    const id = this.selectAgentForm.value.selectAgent;
    console.log(id);
    console.log("user is changed")  
    for (let i = 0; i < this.supervisors.length; i++) {
      if (this.supervisors[i]['id'] == id) {
        
        console.log(this.supervisors[i]);

        this.selectAgentForm.patchValue({
        currentCommissionPercentage: this.supervisors[i]['currentCommissionPercentage'],
          
        })

      }
    }
  }

  submitCommissionSetting(){
    const selectAgent = this.selectAgentForm.value.selectAgent;
    const currentCommissionPercentage = this.selectAgentForm.value.currentCommissionPercentage;
    const newCommissionPercentage = this.selectAgentForm.value.newCommissionPercentage;

    let finalData = {
      selectAgent: selectAgent,
      currentCommissionPercentage: currentCommissionPercentage,
      newCommissionPercentage: newCommissionPercentage
    }

    console.log(finalData);
  }
  ngOnInit(): void {
    this.selectAgentForm = this.formbuilder.group({
      selectAgent: ['', Validators.required],
      currentCommissionPercentage: ['', Validators.required],
      newCommissionPercentage: ['', Validators.required]
    })
  }


}
