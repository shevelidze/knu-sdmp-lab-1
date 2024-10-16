import { FigureName } from "@/enums";

interface Figure {
  name: FigureName;
  area: number;
  perimeter: number;
  render(): JSX.Element;
}

export { Figure };
