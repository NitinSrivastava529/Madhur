import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const IsLoggedIn = localStorage.getItem('IsLoggedIn');
  if (IsLoggedIn) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
