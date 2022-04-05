import { Injectable } from '@angular/core';


export class Profile {
    constructor(
        public id: string,
        public username: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        // public profileImage: string,
        public contactNumber: string,
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class ProfileAdapter{
    constructor(){

    }

    adapt(user: any): Profile {
        return new Profile(
            user.user_id,
            user.username,
            user.first_name,
            user.last_name,
            user.email,
            user.contactNumber,
            // new school(
            //     user.school ? user.school[0].id : null,
            //     user.school ? user.school[0].name : null,
            //     user.school ? user.school[0].address : null,
            //     user.school ? user.school[0].schoolCode : null,
            //     user.school ? user.school[0].type : null
            // )
        )
    }
}