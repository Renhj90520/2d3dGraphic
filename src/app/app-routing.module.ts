import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeHexMosaicComponent } from './three-hex-mosaic/three-hex-mosaic.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'hexmosaic', component: ThreeHexMosaicComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
