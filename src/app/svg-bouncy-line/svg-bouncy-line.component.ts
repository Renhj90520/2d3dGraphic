import { Component, OnInit, ViewChild } from "@angular/core";
import { Elastic, TweenLite } from "gsap";

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

  updateCurve(x?, y?) {
    const svg = this.svgEl.nativeElement;
    const svgRect = svg.getBoundingClientRect();
    const scale = svgRect.width / this.svgViewBoxWidth;
    const width = svgRect.width / scale - 5;
    const height = svgRect.height / scale - 6;

    if (x && y) {
      this.point.x = Math.ceil(x / scale);
      this.point.y = Math.ceil(y / scale);
    }
    // clamp the coordinates to the limits of the SVG viewbox
    this.point.x = this.point.x < 5 ? 5 : this.point.x;
    this.point.y = this.point.y < 5 ? 5 : this.point.y;
    this.point.x = this.point.x > width ? Math.ceil(width) : this.point.x;
    this.point.y = this.point.y > height ? Math.ceil(height) : this.point.y;

    const curve = this.curveEl.nativeElement;
    curve.setAttribute(
      "d",
      curve
        .getAttribute("d")
        .replace(
          /Q (\d+(\.\d+)?) (\d+(\.\d+)?)/,
          `Q ${this.point.x} ${this.point.y}`
        )
    );
  }

  dragMove(evt) {
    const x = evt.event.offsetX;
    const y = evt.event.offsetY;

    evt.source.reset();
    evt.source.element.nativeElement.setAttribute("transform", "");
    this.updateCurve(x, y);
  }

  dragReleased(evt) {
    evt.source.reset();

    TweenLite.to(this.point, 1, {
      x: 95,
      y: 80,
      ease: Elastic.easeOut,
      onUpdate: () => {
        this.updateCurve();
      },
    });
  }
}
