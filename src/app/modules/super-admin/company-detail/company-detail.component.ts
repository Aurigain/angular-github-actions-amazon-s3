import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  companyId
  companyDetails
  constructor(
    private misc: MiscellaneousService,
    private activatedRoute: ActivatedRoute
  ) { }
  fetchCompanyDetails(id) {
    this.misc.getComapnyDetails(id).subscribe(
      data => {
        this.companyDetails = data;
        console.log("company detail", this.companyDetails)
      },
      err => console.log(err)
    )
  }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.companyId = params['id'];

    // });
    this.companyId = this.activatedRoute.snapshot.queryParams['id']
    console.log(this.companyId)
    this.fetchCompanyDetails(this.companyId);
  }

}
