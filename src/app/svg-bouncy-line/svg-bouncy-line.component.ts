import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-svg-bouncy-line",
  templateUrl: "./svg-bouncy-line.component.html",
  styleUrls: ["./svg-bouncy-line.component.css"],
})
export class SvgBouncyLineComponent implements OnInit {
  @ViewChild("svg", { static: true }) svgEl;
  @ViewChild("curve", { static: true }) curveEl;
  @ViewChild("controlpoint", { static: true }) controlpointEl;

  point = {
    x: 95,
    y: 80,
  };
  svgViewBoxWidth = 190;
  constructor() {}

  ngOnInit() {}

  updateCurve(x, y) {
    const svg = this.svgEl.nativeElement;
    const svgRect = svg.getBoundingClientRect();
    debugger;
  }

  dragMove(evt) {
    this.updateCurve(evt.distance.x, evt.distance.y);
  }

  dragReleased(evt) {
    evt.source.reset();
  }
}
