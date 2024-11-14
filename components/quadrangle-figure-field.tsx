import { PointCoordinatesField } from "./point-coordinates-field";
import { Quadrangle } from "@/classes";
import { useEffect, useState } from "react";
import { Point } from "@/types";
import { View } from "react-native";
import { useFormState } from "@/hooks";

interface Props {
  onChange: (value: Quadrangle | null) => void;
}

const QuadrangleFigureField: React.FC<Props> = ({ onChange }) => {
  const [pointA, setPointA] = useFormState<Point | null>(null, 'pointA');
  const [pointB, setPointB] = useFormState<Point | null>(null, 'pointB');
  const [pointC, setPointC] = useFormState<Point | null>(null, 'pointC');
  const [pointD, setPointD] = useFormState<Point | null>(null, 'pointD');

  useEffect(() => {
    if (pointA && pointB && pointC && pointD) {
      onChange(new Quadrangle(pointA, pointB, pointC, pointD));
    } else {
      onChange(null);
    }
  }, [pointA, pointB, pointC, pointD]);

  return (
    <View>
      <PointCoordinatesField
        value={pointA}
        onChange={setPointA}
        label="Point 1"
      />
      <PointCoordinatesField
        value={pointB}
        onChange={setPointB}
        label="Point 2"
      />
      <PointCoordinatesField
        value={pointC}
        onChange={setPointC}
        label="Point 3"
      />
      <PointCoordinatesField
        value={pointD}
        onChange={setPointD}
        label="Point 4"
      />
    </View>
  );
};

export { QuadrangleFigureField };
