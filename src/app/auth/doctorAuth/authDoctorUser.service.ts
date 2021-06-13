import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDoctorData } from './doctorAuth-model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({providedIn: 'root'})
export class AuthDoctorUserService {

  isAuthenticated = false;
  private token : string;
  private tokenTimer : any;
  private authStatusListener  = new Subject<boolean>();
  doctors: Array<any> = [];
  private doctorUpdated = new Subject<AuthDoctorData[]>();
  private currentUserSubject: BehaviorSubject<AuthDoctorData>;
  public currentUser: Observable<AuthDoctorData>;
  private name;
  private contact;
  private email;

  private docUser= [];
  private docUserUpdated = new Subject<any>();


  constructor(private http: HttpClient, private router: Router){
    this.currentUserSubject = new BehaviorSubject<AuthDoctorData>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  createDoctorUser(name: string , contact: string , email: string ,password: string ){
    const authDoctorData :AuthDoctorData = {name:name , contact:contact , email:email , password:password};
    this.http.post("http://localhost:3000/api/doctorUser/doctorSignup",authDoctorData)
      .subscribe(response =>{
        console.log(response);
      });

  }


  login(email: string, password){
    const authDoctorData :AuthDoctorData = {name: null , contact: null , email: email , password: password};
    this.http.post<{token: string, expiresIn: number, name:string, contact: string, email:string}>("http://localhost:3000/api/doctorUser/doctorLogin",authDoctorData)
      .subscribe(response =>{
        const token= response.token;
        this.token=token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate,email);
          this.saveAuthData(token, expirationDate );
          this.name = response.name;
          this.contact = response.contact;
          this.email = response.email;
          console.log(this.name,this.contact,this.email);
          this.router.navigate(['/shoppingcart']);
        }
      });
      return this.http.get<{name: string , contact: string , email: string}>
    ('http://localhost:3000/api/doctorUser/shoppingcart/'+email);

  }


  private setAuthTimer(duration : number){
    console.log("setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }


  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/doctorLogin']);

  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
  }



  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate : new Date(expirationDate)
    }
  }

  getDoctors(){
    this.doctors.push([this.name,this.contact,this.email]);
    return(this.doctors);
  }

  getCurrentDoctor(){
    return this.currentUserSubject.value;
  }

  getDoctorDatas(id: string){
    return this.http.get<{_id: string , name: string, email: string, contact: string, password: string}>
    ('http://localhost:3000/api/doctorUser/' +id);
  }

  getDoctorData() {
    this.http.get<{message: string, doctors: any}>('http://localhost:3000/api/doctorUser/getDoctorUserData')
    .pipe(map(docData => {
     return docData.doctors.map(doc=>{
       return{
        name: doc.name,
        contact: doc.contact,
        email: doc.email,
        password: doc.password,
        id: doc._id
       }
     })
    }))
    .subscribe((transformedSuppliers)=>{
      this.docUser = transformedSuppliers;
      this.docUserUpdated.next([...this.docUser])
    });

  }

  getDoctorUpdateListener() {
    return this.docUserUpdated.asObservable();
  }

  updateDoctor(id: string ,  name: string, email: string, contact: string, password: string){
    const doctor  ={id:id , name:name , email:email , contact:contact , password:password};
    this.http
             .put('http://localhost:3000/api/doctorUser/' +id , doctor)
             .subscribe(response => {
               const updatedDoctors = [...this.docUser];
               const oldDoctorIndex = updatedDoctors.findIndex(s => s.id ===doctor.id);
               updatedDoctors[oldDoctorIndex] = doctor;
               this.docUserUpdated.next([...this.docUser]);
               this.router.navigate(["/settings/DoctorAccount"]);
             });
  }

  deleteUser(userId: string) {
    this.http.delete('http://localhost:3000/api/doctorUser/' +userId)
      .subscribe(() => {
        const updatedSupplier = this.docUser.filter(supplier => supplier.id !== userId);
        this.docUser = updatedSupplier;
        this.docUserUpdated.next([...this.docUser])
      });
  }
};
