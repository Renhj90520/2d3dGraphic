import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeHexMosicComponent } from './three-hex-mosic/three-hex-mosic.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'hexmosic', component: ThreeHexMosicComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
