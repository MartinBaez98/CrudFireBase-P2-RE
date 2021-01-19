import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public myForm:FormGroup;
  public student:Estudiante;
  public validateMessage;

  constructor(private studentService: EstudianteService, private fb:FormBuilder,public toastController: ToastController) {
    this.validateMessage = {
      name: [
        { type: 'required',  message: 'Nombre, es un campo obligatorio.' },
        { type: 'minlength', message: 'Nombre, debe contener por lo menos 3 caracteres.' },
        { type: 'maxlength', message: 'Nombre, no puede exceder 150 caracteres.' }
    ],
    controlnumber: [
      { type: 'required', message: 'Número de control, es un campo obligatorio.' },
      { type: 'minlength', message: 'Número de control, tiene que ser de 10 caracteres.' },
      { type: 'maxlength', message: 'Número de control, tiene que ser de 10 caracteres.' }
    ],
    curp: [
      { type: 'required', message: 'CURP, es un campo obligatorio.' },
      { type: 'pattern', message: 'Debe presentar un formato adecuado.' }
    ],
    age: [
        { type: 'required', message: 'Edad, es un campo obligatorio.' }
    ],
    active: [
      { type: 'required', message: 'Estado, es un campo obligatorio.' }
    ]
    };
   }

   async messageToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500
    });
    toast.present();
  }

   create(){
    this.student = {
      name:this.myForm.controls.name.value,
      controlnumber:this.myForm.controls.controlnumber.value,
      curp:this.myForm.controls.curp.value,
      age:this.myForm.controls.age.value,
      active:this.myForm.controls.active.value
    }
    this.studentService.createStudent(this.student);
    this.messageToast("Alumno añadido");
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name:["",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
        ])
      ],
      controlnumber:["",Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
        ])
      ],
      curp:["",Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9][0-9][0-9][0-9][0-9][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9]')
        ])
      ],
      age:[0,Validators.compose([
        Validators.required
        ])],
      active:[false,Validators.compose([
        Validators.required
        ])]
    });
  }

}
