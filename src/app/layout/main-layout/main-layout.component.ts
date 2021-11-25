import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  username: string | null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.username = this.usuarioService.getUsername();

    // el usuario está logueado? sino al login
    if( !this.usuarioService.isLoggedIn() ) this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {}

  onLogout() {
    console.log('onLogout');
    this.usuarioService.logout();
    this.router.navigateByUrl('/login'); // Main page
  }
}
