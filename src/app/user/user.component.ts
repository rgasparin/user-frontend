import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertMessage } from '../alert-message/alert-message';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent {
  createUser: User = new User();
  findUser: User = new User();
  findUserId: User = new User();
  editUser: User = new User();

  totalUsers: number;
  userList: User[] = [];

  alertMessage: AlertMessage = new AlertMessage();

  viewEditForm: boolean = false;


  constructor(private userService: UserService,
              ) { }

  ngOnInit() {
    this.findAll();
  }

  async findAll() {
      this.userService.findAll().subscribe(
        (result: User[]) => {
          this.userList = result;
          this.totalUsers =result.length;
        }
    );

  }

  saveUser() {
    this.userService.save(this.createUser).subscribe(
      (result: User) => {
        this.alertMessage = new AlertMessage();
        this.alertMessage.classAlert = "alert-success";
        this.alertMessage.textAlert = "User " + result.name +" saved!";
        this.showAlertMessage(this.alertMessage);
        this.findAll();
      }, (error) => {
        this.alertMessage = new AlertMessage();
        this.alertMessage.classAlert = "alert-danger";
        this.alertMessage.textAlert = "Failed: " + error;
        this.showAlertMessage(this.alertMessage);
      }
    );
    this.createUser = new User();
  }

  deletar(idUser: number) {
    this.userService.delete(idUser).subscribe(
      () => {
        this.alertMessage = new AlertMessage();
        this.alertMessage.classAlert = "alert-success";
        this.alertMessage.textAlert = "User deleted!";
        this.showAlertMessage(this.alertMessage);
        this.findAll();
      }, (error: HttpErrorResponse) => {
        this.alertMessage = new AlertMessage();
        this.alertMessage.classAlert = "alert-danger";
        this.alertMessage.textAlert = "Failed: " + error.message;
        this.showAlertMessage(this.alertMessage);
      }
    );
  }

  findUserById() {
    let id = this.findUserId.id;
    if(id != undefined) {
      this.userService.findById(id).subscribe(
        (retorno: User) => {
          this.findUserId = retorno;
          this.alertMessage = new AlertMessage();
          this.alertMessage.classAlert = "alert-success";
          this.alertMessage.textAlert = "User found! " + retorno.name + " - " + retorno.cpf;
          this.showAlertMessage(this.alertMessage);
        }, (error: HttpErrorResponse) => {
          this.alertMessage = new AlertMessage();
          this.alertMessage.classAlert = "alert-danger";
          if(error.status === 404) {
            this.alertMessage.textAlert = "User Not Found!";
          } else {
            this.alertMessage.textAlert = "User Error!"+ error.message;
          }
          this.showAlertMessage(this.alertMessage);
        }
      );
    }
    //this.findUserId = new User();
  }

  editar(id: number) {
    this.userService.findById(id).subscribe(
      (r: User) => {
        this.viewEditForm = true;
        this.editUser = r;
      }, (error: HttpErrorResponse) => {
        this.alertMessage = new AlertMessage();
        this.alertMessage.classAlert = "alert-danger";
        if(error.status === 404) {
          this.alertMessage.textAlert = "User Not Found!";
        } else {
          this.alertMessage.textAlert = "User Error!"+ error.message;
        }
        this.showAlertMessage(this.alertMessage);
      }
    );
  }

  editUserdata() {
    this.userService.save(this.editUser).subscribe(
      (result: User) => {
        this.alertMessage = new AlertMessage();
        this.alertMessage.classAlert = "alert-success";
        this.alertMessage.textAlert = "User " + result.name +" updated!";
        this.viewEditForm = false;
        this.showAlertMessage(this.alertMessage);
        this.findAll();
      }, (error) => {
        this.alertMessage = new AlertMessage();
        this.alertMessage.classAlert = "alert-danger";
        this.alertMessage.textAlert = "Failed: " + error;
        this.showAlertMessage(this.alertMessage);
      }
    );
    this.createUser = new User();
  }

  showAlertMessage(alertMessage: AlertMessage) {
    this.alertMessage = alertMessage;
    this.alertMessage.isAlertHidden = false;
    setTimeout(() => {
      this.alertMessage.isAlertHidden = true;
    }, 3000);
  }


}
