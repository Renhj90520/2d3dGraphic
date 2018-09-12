import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FireballComponent } from "./fireball/fireball.component";
import { GradientBackComponent } from "./gradient-back/gradient-back.component";
import { FunctionsComponent } from "./functions/functions.component";
import { ShapesComponent } from "./shapes/shapes.component";
import { SnowShaderComponent } from "./snow-shader/snow-shader.component";
import { WaveDotsComponent } from "./wave-dots/wave-dots.component";
import { RotateSimpleComponent } from "./rotate-simple/rotate-simple.component";
import { EarthComponent } from "./earth/earth.component";
import { VectorAddSubComponent } from "./vector-add-sub/vector-add-sub.component";
import { VectorDotComponent } from "./vector-dot/vector-dot.component";
import { VectorCrossComponent } from "./vector-cross/vector-cross.component";
import { EnergyPointComponent } from "./energy-point/energy-point.component";
import { FragmentShaderComponent } from "./post-processing/fragment-shader.component";
import { GroupComponent } from "./group/group.component";
import { PointcloudStarsComponent } from "./pointcloud-stars/pointcloud-stars.component";
import { MagicBallComponent } from "./magic-ball/magic-ball.component";
import { FramerateComponent } from "./framerate/framerate.component";
import { CanvasOrbitTrailsComponent } from "./canvas-orbit-trails/canvas-orbit-trails.component";
import { CanvasSparkleTrailComponent } from "./canvas-sparkle-trail/canvas-sparkle-trail.component";
import { CanvasVisualizationComponent } from "./canvas-visualization/canvas-visualization.component";
import { CanvasSparkleLoaderComponent } from "./canvas-sparkle-loader/canvas-sparkle-loader.component";
import { CanvasWaterfallComponent } from "./canvas-waterfall/canvas-waterfall.component";
import { CanvasFireworksComponent } from "./canvas-fireworks/canvas-fireworks.component";
import { CanvasLineeffectComponent } from "./canvas-lineeffect/canvas-lineeffect.component";
import { CanvasCrazyFireworksComponent } from "./canvas-crazy-fireworks/canvas-crazy-fireworks.component";
import { CanvasStarrySkyComponent } from "./canvas-starry-sky/canvas-starry-sky.component";
import { CanvasConfettiCannonComponent } from "./canvas-confetti-cannon/canvas-confetti-cannon.component";
import { CanvasCircleLoaderComponent } from "./canvas-circle-loader/canvas-circle-loader.component";
import { CanvasBubbleComponent } from "./canvas-bubble/canvas-bubble.component";
import { CanvasBokehGenerationComponent } from "./canvas-bokeh-generation/canvas-bokeh-generation.component";
import { CanvasAzureLoadingComponent } from "./canvas-azure-loading/canvas-azure-loading.component";
import { CanvasMatrixTextComponent } from "./canvas-matrix-text/canvas-matrix-text.component";
import { CanvasNeonBubblesComponent } from "./canvas-neon-bubbles/canvas-neon-bubbles.component";
import { ThreeGsapTimescaleComponent } from "./three-gsap-timescale/three-gsap-timescale.component";
import { ThreeRotateShapesComponent } from "./three-rotate-shapes/three-rotate-shapes.component";
import { ThreeGsapFlipyComponent } from "./three-gsap-flipy/three-gsap-flipy.component";
import { ThreeKaleidoscopeComponent } from "./three-kaleidoscope/three-kaleidoscope.component";
import { ThreeScalingBallComponent } from "./three-scaling-ball/three-scaling-ball.component";
import { ThreeProceduralTunnelComponent } from "./three-procedural-tunnel/three-procedural-tunnel.component";
import { ThreeMyworldComponent } from "./three-myworld/three-myworld.component";
import { ThreeEarthComponent } from "./three-earth/three-earth.component";
import { ThreeLiquidComponent } from "./three-liquid/three-liquid.component";
import { ThreeTrailingParticleComponent } from "./three-trailing-particle/three-trailing-particle.component";
import { CanvasParticleTrailComponent } from "./canvas-particle-trail/canvas-particle-trail.component";
import { ThreeTinyPolyworldComponent } from "./three-tiny-polyworld/three-tiny-polyworld.component";
import { ThreeFlowerComponent } from "./three-flower/three-flower.component";
import { ThreeBuffergeometryComponent } from "./three-buffergeometry/three-buffergeometry.component";
import { ThreePrimordialSoupComponent } from "./three-primordial-soup/three-primordial-soup.component";
import { ThreeSuperMarryComponent } from "./three-super-marry/three-super-marry.component";
import { ThreeVoronoiZoomComponent } from "./three-voronoi-zoom/three-voronoi-zoom.component";
import { ThreeAreaLightComponent } from "./three-area-light/three-area-light.component";
import { ThreeSpinnerComponent } from "./three-spinner/three-spinner.component";
import { ThreeExplodeTextComponent } from "./three-explode-text/three-explode-text.component";
import { ThreeFireComponent } from "./three-fire/three-fire.component";
import { ThreeSpriteSphereComponent } from "./three-sprite-sphere/three-sprite-sphere.component";
import { ThreeAirplaneComponent } from "./three-airplane/three-airplane.component";
import { ThreeAirplaneColoredComponent } from "./three-airplane-colored/three-airplane-colored.component";
import { ThreeLotusComponent } from "./three-lotus/three-lotus.component";
import { ThreeTunnelAnimationComponent } from './three-tunnel-animation/three-tunnel-animation.component';
import { ThreeBlueLightComponent } from './three-blue-light/three-blue-light.component';
import { ThreeNoiseGroundComponent } from './three-noise-ground/three-noise-ground.component';

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
    CanvasBokehGenerationComponent,
    CanvasAzureLoadingComponent,
    CanvasMatrixTextComponent,
    CanvasNeonBubblesComponent,
    ThreeGsapTimescaleComponent,
    ThreeRotateShapesComponent,
    ThreeGsapFlipyComponent,
    ThreeKaleidoscopeComponent,
    ThreeScalingBallComponent,
    ThreeProceduralTunnelComponent,
    ThreeMyworldComponent,
    ThreeEarthComponent,
    ThreeLiquidComponent,
    ThreeTrailingParticleComponent,
    CanvasParticleTrailComponent,
    ThreeTinyPolyworldComponent,
    ThreeFlowerComponent,
    ThreeBuffergeometryComponent,
    ThreePrimordialSoupComponent,
    ThreeSuperMarryComponent,
    ThreeVoronoiZoomComponent,
    ThreeAreaLightComponent,
    ThreeSpinnerComponent,
    ThreeExplodeTextComponent,
    ThreeFireComponent,
    ThreeSpriteSphereComponent,
    ThreeAirplaneComponent,
    ThreeAirplaneColoredComponent,
    ThreeLotusComponent,
    ThreeTunnelAnimationComponent,
    ThreeBlueLightComponent,
    ThreeNoiseGroundComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
