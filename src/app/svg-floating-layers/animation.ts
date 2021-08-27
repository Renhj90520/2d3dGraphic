import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";

const anim = animation(
  [
    animate(
      "2s ease-out",
      keyframes([
        style({
          transform: `translateX({{x}}px) translateY({{y}}px) translateZ({{z}}px)`,
          offset: 0,
        }),
        style({
          transform: `translateX({{x}}px) translateY({{y2}}px) translateZ({{z}}px)`,
          offset: 0.5,
        }),
        style({
          transform: `translateX({{x}}px) translateY({{y}}px) translateZ({{z}}px)`,
          offset: 1,
        }),
      ])
    ),
  ],
  { params: { x: 0, y: 0, z: 0, y2: 0 } }
);
export const floatingAnimation = trigger("floating", [
  transition(":enter", [anim]),
]);
