import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Vérifie si l'exécution se fait côté navigateur (client)
  if (isPlatformBrowser(platformId)) {
    // Si côté client, utilise localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['']);
      return false;
    }
  } else {
    // Si côté serveur, retourne false ou redirige par défaut
    // (Le serveur ne peut pas vérifier l'état de localStorage)
    router.navigate(['']);
    return false;
  }
};