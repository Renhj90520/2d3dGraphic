import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval } from "rxjs";
import { floatingAnimation } from "./animation";

@Component({
  selector: "app-svg-floating-layers",
  templateUrl: "./svg-floating-layers.component.html",
  styleUrls: ["./svg-floating-layers.component.scss"],
  animations: [floatingAnimation],
})
export class SvgFloatingLayersComponent implements OnInit, OnDestroy {
  layers = [
    {
      text: "Layer 1A",
      gradient: {
        from: "#E42746",
        to: "#E42795",
      },
      offset: { x: 52, y: 50, y2: 50, z: 0 },
      size: 48,
    },
    {
      text: "Layer 1B",
      gradient: {
        from: "#E42746",
        to: "#E42795",
      },
      offset: { x: 0, y: 50, y2: 50, z: 0 },
      size: 48,
    },
    {
      text: "Layer 1C",
      gradient: {
        from: "#E42746",
        to: "#E42795",
      },
      offset: { x: 26, y: 60, y2: 60, z: 0 },
      size: 48,
    },
    {
      text: "Layer 2",
      gradient: {
        from: "#3186ab",
        to: "#3153AB",
      },
      offset: { x: 0, y: 20, y2: 20, z: 0 },
      size: 100,
    },
    {
      text: "Layer 3",
      gradient: {
        from: "#11eda1",
        to: "#11edda",
      },
      offset: { x: 0, y: 0, y2: 0, z: 0 },
      size: 100,
    },
  ];
  animationSub$: any;
  constructor() {}
  ngOnDestroy(): void {
    if (this.animationSub$) {
      this.animationSub$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.animationSub$ = interval(1000).subscribe(() => {
      this.layers.forEach((layer) => {
        const offset = layer.offset;
        const y = offset.y;
        const y2 = offset.y2;
        if (y === y2) {
          offset.y2 = y + 3;
        } else {
          offset.y2 = y;
        }
      });
    });
  }
}
