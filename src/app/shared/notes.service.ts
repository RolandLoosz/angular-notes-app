import { AuthService } from 'src/app/shared/auth.service';
import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  collectionName = 'notes';
  user=JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  constructor(private afs: AngularFirestore, private auth:AuthService) { }

  create(note: Note) {
    note.userid=this.user.uid;
    note.id = this.afs.createId();
    note.date= new Date().getTime();
    return this.afs.collection<Note>(this.collectionName).doc(note.id).set(note);

  }

  getAll() {
    const user=JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    return this.afs.collection<Note>(this.collectionName, ref=> ref.where('userid','==',user.uid)).valueChanges();
  }

  update(note: Note) {
    note.userid=this.user.uid;
    note.date= new Date().getTime();
    return this.afs.collection<Note>(this.collectionName).doc(note.id).set(note);
  }

  delete(id: string) {
    return this.afs.collection<Note>(this.collectionName).doc(id).delete();
  }

  get(id: string) {
    return this.afs.collection<Note>(this.collectionName, ref=> ref.where('id','==',id)).valueChanges();
  }

}
