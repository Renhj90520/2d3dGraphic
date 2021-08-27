import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "[app-layer]",
  templateUrl: "./layer.component.html",
  styleUrls: ["./layer.component.css"],
  host: { class: "layer" },
})
export class LayerComponent implements OnInit, OnChanges {
  @Input() text;
  @Input() gradient;
  @Input() size;
  // @Input() offset = { x: 0, y: 0, z: 0 };
  width = 0;
  height = 0;
  thickness = 5;
  fontsize = 7;

  gid = Math.trunc(Math.random() * 10000 + 10000);
  fid = Math.trunc(Math.random() * 10000 + 10000);
  constructor(private el: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.size && this.size) {
      this.width = this.size;
      this.height = 40 * (this.size / 100);
    }

    // if (changes.offset && this.offset) {
    //   setTimeout(() => {
    //     const el = this.el.nativeElement;
    //     el.style["--offset-x"] = this.offset.x;
    //     el.style["--offset-y"] = this.offset.y;
    //     el.style["--offset-z"] = this.offset.z;
    //     console.log(el.style);
    //   }, 0);
    // }
  }

  ngOnInit(): void {}
}
