import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EtudiantModule } from './etudiant/etudiant.module';

const routes: Routes = [
  { path: 'etudiant', loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule) },
  { path: '', redirectTo: '/etudiant', pathMatch: 'full' }, // Redirige vers la page d'accueil étudiant
  { path: '**', redirectTo: '/etudiant' } // Route par défaut
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    EtudiantModule // Importez le module étudiant
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }