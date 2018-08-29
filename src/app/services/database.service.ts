import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http, Response } from '@angular/http';
import { Event } from '../models/Event';
import { Image } from '../models/Image';
import { Program } from '../models/Program';
import { BoardMember } from '../models/BoardMember';
import { Staff } from '../models/Staff';
@Injectable()
export class DatabaseService {
  eventsCollection: AngularFirestoreCollection<Event>;
  imagesCollection: AngularFirestoreCollection<Image>;
  boardCollection: AngularFirestoreCollection<BoardMember>;
  programCollection: AngularFirestoreCollection<Program>;
  staffCollection: AngularFirestoreCollection<Staff>;
  eventDoc: AngularFirestoreDocument<Event>;
  events: Observable<Event[]>;
  images: Observable<Image[]>;
  programs: Observable<Program[]>;
  board: Observable<BoardMember[]>;
  event: Observable<Event>;
  staff: Observable<Staff[]>;


  constructor(private firestore: AngularFirestore) {
    this.eventsCollection =  this.firestore.collection('events');
    this.imagesCollection = this.firestore.collection('images');
    this.boardCollection = this.firestore.collection('boardMembers');
    this.programCollection = this.firestore.collection('programs');
    this.staffCollection = this.firestore.collection('staff');
  }

  getEvents(): Observable<Event[]> {
    this.events = this.eventsCollection.snapshotChanges().map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Event;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    });
    return this.events;
  }

  deleteEvent (id: string) {
    this.eventsCollection.doc(id).delete().then( () => {
      console.log('Document successfully deleted');
    });
  }

  addEvent(event: Event) {
    this.eventsCollection.add(event);
  }

  getDoc(id: string): Observable<Event> {
    let fetched = this.eventsCollection.doc(id).snapshotChanges()
    .map( change => {
      const data = change.payload.data() as Event;
      const docId = change.payload.id;
      return {id, ...data};
    });
      return fetched;
  }

  updateEvent(event: any) {
    console.log(event);
     this.eventsCollection.doc(event.id)
     .set({
       title: event.title,
       start: event.start,
       end: event.end,
       description: event.description,
       image: event.image,
       tagline: event.tagline,
       attachments: event.attachments,
       lastEdited: new Date()
    });
  }

  getImageDoc(comp: string, key: string): Observable<Image[]> {
      let fetchedRef = this.firestore
        .collection('images', ref => ref.where(comp, '==', key));

        let toReturn = fetchedRef.snapshotChanges().map( changes => {
          return changes.map( action => {
            const data = action.payload.doc.data() as Image;
            const $id = action.payload.doc.id;
            return {$id, ...data};
          });
        });
        return toReturn;
  }

  getImageRef(id: string): Observable<Image> {
    let fetched = this.imagesCollection.doc(id).snapshotChanges()
    .map( change => {
      const data = change.payload.data() as Image;
      const $id = change.payload.id;
      return {$id, ...data};
    });
      return fetched;
  }

  addImageRef (img: Image) {
    this.imagesCollection.add(img);
  }


  getImageRefs(): Observable<Image[]> {
    this.images = this.imagesCollection.snapshotChanges().map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Image;
        const $id = action.payload.doc.id;
        return {$id, ...data};
      });
    });
    return this.images;
  }

  deleteImageRef(key: string) {
    this.imagesCollection.doc(key).delete().then( () => {
      console.log('Document successfully deleted');
    });
  }

  addBoardMember(member: BoardMember) {
    this.boardCollection.add(member);
  }

  deleteBoardmember (id: string) {
    this.boardCollection.doc(id).delete().then( () => {
      console.log('Document successfully deleted');
    });
  }

  getBoardMembers(): Observable<BoardMember[]> {
    this.board = this.boardCollection.snapshotChanges().map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as BoardMember;
        const $id = action.payload.doc.id;
        return {$id, ...data};
      });
    });
    return this.board;
  }

  getBoardDoc(id: string): Observable<BoardMember> {
    let fetched = this.boardCollection.doc(id).snapshotChanges()
    .map( change => {
      const data = change.payload.data() as BoardMember;
      const docId = change.payload.id;
      return {id, ...data};
    });
      return fetched;
  }

  updateMember(bm: BoardMember) {
    console.log(bm);
     this.boardCollection.doc(bm.$id)
     .set({
       fname: bm.fname,
       lname: bm.lname,
       position: bm.position,
       occupation: bm.occupation,
       employer: bm.employer
    });
  }

  getPrograms(): Observable<Program[]> {
    this.programs = this.programCollection.snapshotChanges().map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Program;
        const $id = action.payload.doc.id;
        return {$id, ...data};
      });
    });
    return this.programs;

  }

  getProgramRef(id: string): Observable<Program> {
    let fetched = this.programCollection.doc(id).snapshotChanges()
    .map( change => {
      const data = change.payload.data() as Program;
      const docId = change.payload.id;
      return {id, ...data};
    });
      return fetched;
  }

  addProgram(program: Program) {
    this.programCollection.add(program);
  }

  deleteProgram(id: string) {
    this.programCollection.doc(id).delete().then(() => {
      console.log('Program deleted');
    });
  }

  updateProgram(p: any) {
    this.programCollection.doc(p.$id).set({
      title: p.title,
      description: p.description,
      tagline: p.tagline,
      images: p.images,
      featuredimg: p.featuredimg,
      featured: p.featured,
      forwho: p.forwho,
      when: p.when,
      howtoreg: p.howtoreg,
      category: p.category
    });
  }


  getStaffMembers(): Observable<Staff[]> {
    this.staff = this.staffCollection.snapshotChanges().map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Staff;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    });
    return this.staff;
  }

  getStaffDoc(id: string): Observable<Staff> {
    let fetched = this.staffCollection.doc(id).snapshotChanges()
    .map( change => {
      const data = change.payload.data() as Staff;
      const docId = change.payload.id;
      return {id, ...data};
    });
      return fetched;
  }

  updateStaff(bm: Staff) {
    console.log(bm);
     this.staffCollection.doc(bm.id)
     .set({
       fname: bm.fname,
       lname: bm.lname,
       position: bm.position,
       suffix: bm.suffix,
       staffEmail: bm.staffEmail
    });
  }

  addStaffMember(member: Staff) {
    this.staffCollection.add(member);
  }

  deleteStaffMember (id: string) {
    this.staffCollection.doc(id).delete().then( () => {
      console.log('Document successfully deleted');
    });
  }

}
