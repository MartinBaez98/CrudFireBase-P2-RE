import { Component, OnInit } from '@angular/core';

import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

import { UsuariosService } from "src/app/services/usuarios.service";
import { Usuario } from "src/app/models/usuarios";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm:FormGroup; 

  public user:Usuario;
  public users:Usuario[];

  constructor(private userService:UsuariosService, private fb:FormBuilder,private router:Router,public toastController: ToastController) { 
    this.userService.getUsers().subscribe(data =>{
      this.users=data.map(e=>{
        return{
          id:e.payload.doc.id,
          email:e.payload.doc.get("email"),
          password:e.payload.doc.get("password")
        }as Usuario
      })
    });
  }

  async messageToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500
    });
    toast.present();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email:[""],
      password:[""]
    });
  }

  join() {
    console.log(this.users);
    this.user={
      email:this.myForm.controls.email.value,
      password:this.myForm.controls.password.value
    }

    const temporalUser = this.users.find(user => user.email === this.user.email)
    if(temporalUser){
      if(temporalUser.password){
        this.messageToast("Sesión iniciada.")
        this.router.navigate(['/tabs/tab1'])
      }
      else{
        this.messageToast("Contraseña incorrecta.")
      }
    }
    else{
      this.messageToast("Usuario inexistente")
    }
  }

}
