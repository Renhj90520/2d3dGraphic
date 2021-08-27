import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThreeHexMosaicComponent } from "./three-hex-mosaic/three-hex-mosaic.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { SvgFloatingLayersComponent } from "./svg-floating-layers/svg-floating-layers.component";

const routes: Routes = [
  { path: "", redirectTo: "gallery", pathMatch: "full" },
  { path: "gallery", component: GalleryComponent },
  { path: "hexmosaic", component: ThreeHexMosaicComponent },
  { path: "floatinglayer", component: SvgFloatingLayersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
