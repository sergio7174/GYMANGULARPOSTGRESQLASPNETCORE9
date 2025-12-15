import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ContactusComponent } from './components/home/contact/contactus/contactus.component';
import { StatusComponent } from './components/home/member/status/status.component';
import { HomeAdminComponent } from './components/homeAdmin/home-admin/home-admin.component';
import { ClassdetailsComponent } from './components/home/classes/classdetails/classdetails.component';
import { ClassesTableComponent } from './components/home/classes/classes-table/classes-table.component';
import { SalesComponent } from './components/home/sales/sales/sales.component';
import { authGuard } from './core/guard/auth.guard';
import { CategoryCreateComponent } from './components/homeAdmin/category/category-create/category-create.component';
import { CategoryListComponent } from './components/homeAdmin/category/category-list/category-list.component';
import { CategoryEditComponent } from './components/homeAdmin/category/category-edit/category-edit.component';
import { PackCreateComponent } from './components/homeAdmin/pack/pack-create/pack-create.component';
import { PackListComponent } from './components/homeAdmin/pack/pack-list/pack-list.component';
import { PackEditComponent } from './components/homeAdmin/pack/pack-edit/pack-edit.component';
import { StaffCreateComponent } from './components/homeAdmin/staff/staff-create/staff-create.component';
import { StaffEditComponent } from './components/homeAdmin/staff/staff-edit/staff-edit.component';
import { StaffListComponent } from './components/homeAdmin/staff/staff-list/staff-list.component';
import { TrainersComponent } from './components/home/trainers/trainers/trainers.component';
import { PacksComponent } from './components/home/packs/packs/packs.component';
import { ClassesComponent } from './components/home/classes/classes/classes.component';
import { ClassesCreateComponent } from './components/homeAdmin/classes/classes-create/classes-create.component';
import { ClassesListComponent } from './components/homeAdmin/classes/classes-list/classes-list.component';
import { ClassesEditComponent } from './components/homeAdmin/classes/classes-edit/classes-edit.component';
import { MemberListComponent } from './components/homeAdmin/member/member-list/member-list.component';



export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'trainers', component: TrainersComponent },
    { path: 'packs', component: PacksComponent },
    { path: 'classes', component: ClassesComponent },
    { path: 'classDetails/:id', component: ClassdetailsComponent },
    { path: 'classTable', component: ClassesTableComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'sales/:id', component: SalesComponent },
    { path: 'memberStatus', component: StatusComponent },
    { path: 'homeAdmin', component: HomeAdminComponent, pathMatch: 'full',  canActivate: [authGuard] },
    { path: 'createCategory', component: CategoryCreateComponent, canActivate: [authGuard]  },
    { path: 'listCategories', component: CategoryListComponent, canActivate: [authGuard]  },
    { path: 'editCategory/:id', component: CategoryEditComponent, canActivate: [authGuard]  },
    { path: 'createPack', component: PackCreateComponent, canActivate: [authGuard]  },
    { path: 'editPack/:id', component: PackEditComponent, canActivate: [authGuard]  },
    { path: 'listPack', component: PackListComponent, canActivate: [authGuard]  },
    { path: 'editStaff/:id', component: StaffEditComponent, canActivate: [authGuard]  },
    { path: 'createStaff', component: StaffCreateComponent, canActivate: [authGuard]  },
    { path: 'listStaff', component: StaffListComponent, canActivate: [authGuard]  },
    { path: 'createClass', component: ClassesCreateComponent, canActivate: [authGuard]  },
    { path: 'listClasses', component: ClassesListComponent, canActivate: [authGuard]  },
    { path: 'editclass/:id', component: ClassesEditComponent, canActivate: [authGuard]  },
    { path: 'listMembers', component: MemberListComponent, canActivate: [authGuard]  },



    
    { path: '**',component: HomeComponent },
    



];
