import { PointCoordinatesField } from "./point-coordinates-field";
import { Quadrangle } from "@/classes";
import { useState } from "react";
import { Point } from "@/types";
import { View } from "react-native";

interface Props {
  onChange: (value: Quadrangle | null) => void;
}

const QuadrangleFigureField: React.FC<Props> = ({ onChange }) => {
  const [pointA, setPointA] = useState<Point | null>(null);
  const [pointB, setPointB] = useState<Point | null>(null);
  const [pointC, setPointC] = useState<Point | null>(null);
  const [pointD, setPointD] = useState<Point | null>(null);

  const createPointChangeHandler = (
    stateSetter: React.Dispatch<React.SetStateAction<Point | null>>
  ) => {
    return (value: Point | null) => {
      stateSetter(value);

      let nextPointA = pointA;
      let nextPointB = pointB;
      let nextPointC = pointC;
      let nextPointD = pointC;

      if (stateSetter === setPointA) {
        nextPointA = value;
      } else if (stateSetter === setPointB) {
        nextPointB = value;
      } else if (stateSetter === setPointC) {
        nextPointC = value;
      } else {
        nextPointD = value;
      }

      if (nextPointA && nextPointB && nextPointC && nextPointD) {
        onChange(
          new Quadrangle(nextPointA, nextPointB, nextPointC, nextPointD)
        );
      } else {
        onChange(null);
      }
    };
  };

  return (
    <View>
      <PointCoordinatesField
        value={pointA}
        onChange={createPointChangeHandler(setPointA)}
        label="Point 1"
      />
      <PointCoordinatesField
        value={pointB}
        onChange={createPointChangeHandler(setPointB)}
        label="Point 2"
      />
      <PointCoordinatesField
        value={pointC}
        onChange={createPointChangeHandler(setPointC)}
        label="Point 3"
      />
      <PointCoordinatesField
        value={pointD}
        onChange={createPointChangeHandler(setPointD)}
        label="Point 4"
      />
    </View>
  );
};

export { QuadrangleFigureField };
