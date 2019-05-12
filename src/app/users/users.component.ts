import {Component, OnInit} from '@angular/core';
import {FormState, UsersService} from '@app/users/users.service';
import {User, UserType} from '@app/models/user';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  userTypes: string[] = Object.keys(UserType);
  userForm: User = new User();
  formState: FormState = FormState.New;
  FormStates = FormState;
  loading: boolean;
  display = false;

  constructor(private usersService: UsersService, private confirmationService: ConfirmationService) {
    this.userTypes = this.userTypes.slice(this.userTypes.length / 2);
  }

  ngOnInit() {
  }


  showDialog(user?: User) {
    this.display = true;
    if (user) {
      this.formState = FormState.Edit;
      this.userForm = user;
    } else {
      this.formState = FormState.New;
      this.userForm = new User();
    }
  }

  loadUsers($event: LazyLoadEvent) {
    this.loading = true;
    this.usersService.AllUsers().subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usersService.deleteUser(user).subscribe(result => {
          const index = this.users.indexOf(user, 0);
          if (index > -1) {
            this.users.splice(index, 1);
          }
        });
      },
      reject: () => {

      }
    });
  }

  onSubmit() {
    this.usersService.updateUser(this.userForm, this.formState).subscribe(result => {
      if (this.formState === FormState.New) {
        this.users.push(this.userForm);
      }
      this.display = false;
    });
  }
}
