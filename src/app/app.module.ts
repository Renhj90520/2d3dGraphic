import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FireballComponent } from './fireball/fireball.component';
import { GradientBackComponent } from './gradient-back/gradient-back.component';
import { FunctionsComponent } from './functions/functions.component';
import { ShapesComponent } from './shapes/shapes.component';
import { SnowShaderComponent } from './snow-shader/snow-shader.component';
import { WaveDotsComponent } from './wave-dots/wave-dots.component';
import { RotateSimpleComponent } from './rotate-simple/rotate-simple.component';
import { EarthComponent } from './earth/earth.component';
import { VectorAddSubComponent } from './vector-add-sub/vector-add-sub.component';
import { VectorDotComponent } from './vector-dot/vector-dot.component';
import { VectorCrossComponent } from './vector-cross/vector-cross.component';
import { EnergyPointComponent } from './energy-point/energy-point.component';
import { FragmentShaderComponent } from './post-processing/fragment-shader.component';
import { GroupComponent } from './group/group.component';
import { PointcloudStarsComponent } from './pointcloud-stars/pointcloud-stars.component';
import { MagicBallComponent } from './magic-ball/magic-ball.component';
import { FramerateComponent } from './framerate/framerate.component';
import { CanvasOrbitTrailsComponent } from './canvas-orbit-trails/canvas-orbit-trails.component';
import { CanvasSparkleTrailComponent } from './canvas-sparkle-trail/canvas-sparkle-trail.component';
import { CanvasVisualizationComponent } from './canvas-visualization/canvas-visualization.component';
import { CanvasSparkleLoaderComponent } from './canvas-sparkle-loader/canvas-sparkle-loader.component';
import { CanvasWaterfallComponent } from './canvas-waterfall/canvas-waterfall.component';
import { CanvasFireworksComponent } from './canvas-fireworks/canvas-fireworks.component';
import { CanvasLineeffectComponent } from './canvas-lineeffect/canvas-lineeffect.component';
import { CanvasCrazyFireworksComponent } from './canvas-crazy-fireworks/canvas-crazy-fireworks.component';
import { CanvasStarrySkyComponent } from './canvas-starry-sky/canvas-starry-sky.component';
import { CanvasConfettiCannonComponent } from './canvas-confetti-cannon/canvas-confetti-cannon.component';
import { CanvasCircleLoaderComponent } from './canvas-circle-loader/canvas-circle-loader.component';
import { CanvasBubbleComponent } from './canvas-bubble/canvas-bubble.component';
import { CanvasBokehGenerationComponent } from './canvas-bokeh-generation/canvas-bokeh-generation.component';

@NgModule({
  declarations: [
    AppComponent,
    FireballComponent,
    GradientBackComponent,
    FunctionsComponent,
    ShapesComponent,
    SnowShaderComponent,
    WaveDotsComponent,
    RotateSimpleComponent,
    EarthComponent,
    VectorAddSubComponent,
    VectorDotComponent,
    VectorCrossComponent,
    EnergyPointComponent,
    FragmentShaderComponent,
    GroupComponent,
    PointcloudStarsComponent,
    MagicBallComponent,
    FramerateComponent,
    CanvasOrbitTrailsComponent,
    CanvasSparkleTrailComponent,
    CanvasVisualizationComponent,
    CanvasSparkleLoaderComponent,
    CanvasWaterfallComponent,
    CanvasFireworksComponent,
    CanvasLineeffectComponent,
    CanvasCrazyFireworksComponent,
    CanvasStarrySkyComponent,
    CanvasConfettiCannonComponent,
    CanvasCircleLoaderComponent,
    CanvasBubbleComponent,
    CanvasBokehGenerationComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
