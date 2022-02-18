import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    constructor(private router: Router) { }

    Login(name: string) {
        localStorage.setItem("idUser", name)
        this.router.navigate(['/home']);
    }

    Logout() {
        localStorage.removeItem("idUser");
        this.router.navigate(['/login']);
    }

}
