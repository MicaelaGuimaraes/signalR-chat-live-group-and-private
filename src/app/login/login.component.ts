import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Form = this._form.group({
    name: ['', Validators.required]
  })

  constructor(private _form: FormBuilder, private serviceAuth: AuthService) { }

  ngOnInit(): void {
  }

  Login() {
    this.serviceAuth.Login(this.Form.controls['name'].value);
  }

}
