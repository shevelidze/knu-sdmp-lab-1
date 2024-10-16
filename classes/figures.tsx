import { FigureName } from "@/enums";
import { Figure, Point } from "@/types";
import { Path } from "react-native-svg";

function getDistance(point1: Point, point2: Point) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

function angleBetweenDiagonals(a: number, b: number, c: number): number {
  return Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));
}

const STROKE_WIDTH = 0.1;

class Triangle implements Figure {
  constructor(
    private point1: Point,
    private point2: Point,
    private point3: Point
  ) {}

  get name() {
    return FigureName.TRIANGLE;
  }

  get area() {
    const side1 = getDistance(this.point1, this.point2);
    const side2 = getDistance(this.point2, this.point3);
    const side3 = getDistance(this.point3, this.point1);
    const semiPerimeter = (side1 + side2 + side3) / 2;
    return Math.sqrt(
      semiPerimeter *
        (semiPerimeter - side1) *
        (semiPerimeter - side2) *
        (semiPerimeter - side3)
    );
  }

  get perimeter() {
    const side1 = getDistance(this.point1, this.point2);
    const side2 = getDistance(this.point2, this.point3);
    const side3 = getDistance(this.point3, this.point1);
    return side1 + side2 + side3;
  }

  render(): JSX.Element {
    return (
      <Path
        d={`M ${this.point1.x} ${this.point1.y} L ${this.point2.x} ${this.point2.y} L ${this.point3.x} ${this.point3.y} Z`}
        fill="none"
        stroke="black"
        strokeWidth={STROKE_WIDTH}
      />
    );
  }
}

class Quadrangle implements Figure {
  constructor(
    private point1: Point,
    private point2: Point,
    private point3: Point,
    private point4: Point
  ) {}

  get name() {
    return FigureName.QUADRANGLE;
  }

  get area() {
    // Calculate side lengths
    const a = getDistance(this.point1, this.point2);
    const b = getDistance(this.point2, this.point3);
    const c = getDistance(this.point3, this.point4);
    const d = getDistance(this.point4, this.point1);

    // Calculate diagonals
    const diag1 = getDistance(this.point1, this.point3);
    const diag2 = getDistance(this.point2, this.point4);

    // Semiperimeter
    const s = (a + b + c + d) / 2;

    // Angle between diagonals
    const cosTheta = angleBetweenDiagonals(
      diag1,
      diag2,
      getDistance(this.point1, this.point4)
    );

    // Bretschneider's formula
    const area = Math.sqrt(
      (s - a) * (s - b) * (s - c) * (s - d) -
        0.25 * diag1 * diag2 * (1 + Math.cos(cosTheta))
    );

    return area;
  }

  get perimeter() {
    const side1 = getDistance(this.point1, this.point2);
    const side2 = getDistance(this.point2, this.point3);
    const side3 = getDistance(this.point3, this.point4);
    const side4 = getDistance(this.point4, this.point1);
    return side1 + side2 + side3 + side4;
  }

  render(): JSX.Element {
    return (
      <Path
        d={`M ${this.point1.x} ${this.point1.y} L ${this.point2.x} ${this.point2.y} L ${this.point3.x} ${this.point3.y} L ${this.point4.x} ${this.point4.y} Z`}
        fill="none"
        stroke="black"
        strokeWidth={STROKE_WIDTH}
      />
    );
  }
}

class Circle implements Figure {
  constructor(private center: Point, private radius: number) {}

  get name() {
    return FigureName.CIRCLE;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }

  render(): JSX.Element {
    return (
      <Path
        d={`M ${this.center.x} ${this.center.y} m -${this.radius}, 0 a ${
          this.radius
        }, ${this.radius} 0 1, 0 ${this.radius * 2}, 0 a ${this.radius}, ${
          this.radius
        } 0 1, 0 -${this.radius * 2}, 0`}
        fill="none"
        stroke="black"
        strokeWidth={STROKE_WIDTH}
      />
    );
  }
}

class Ellipse implements Figure {
  constructor(
    private center: Point,
    private xRadius: number,
    private yRadius: number
  ) {}

  get name() {
    return FigureName.ELLIPSE;
  }

  get area() {
    return Math.PI * this.xRadius * this.yRadius;
  }

  get perimeter() {
    return 2 * Math.PI * Math.sqrt((this.xRadius ** 2 + this.yRadius ** 2) / 2);
  }

  render(): JSX.Element {
    return (
      <Path
        d={`M ${this.center.x} ${this.center.y} m -${this.xRadius}, 0 a ${
          this.xRadius
        }, ${this.yRadius} 0 1, 0 ${this.xRadius * 2}, 0 a ${this.xRadius}, ${
          this.yRadius
        } 0 1, 0 -${this.xRadius * 2}, 0`}
        fill="none"
        stroke="black"
        strokeWidth={STROKE_WIDTH}
      />
    );
  }
}

export { Triangle, Quadrangle, Circle, Ellipse };
