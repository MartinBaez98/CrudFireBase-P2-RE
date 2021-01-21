import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Estudiante } from 'src/app/models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private firestore: AngularFirestore) { }

  createStudent(student: Estudiante){
    return this.firestore.collection('estudiante').add(student);
  }

  getStudents(){
    return this.firestore.collection('estudiante').snapshotChanges();
  }
}
