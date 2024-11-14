import { PointCoordinatesField } from "./point-coordinates-field";
import { Triangle } from "@/classes";
import { useEffect, useState } from "react";
import { Point } from "@/types";
import { View } from "react-native";
import { useFormState } from "@/hooks";

interface Props {
  onChange: (value: Triangle | null) => void;
}

const TriangleFigureField: React.FC<Props> = ({ onChange }) => {
  const [pointA, setPointA] = useFormState<Point | null>(null, "pointA");
  const [pointB, setPointB] = useFormState<Point | null>(null, "pointB");
  const [pointC, setPointC] = useFormState<Point | null>(null, "pointC");

  useEffect(() => {
    if (pointA && pointB && pointC) {
      onChange(new Triangle(pointA, pointB, pointC));
    } else {
      onChange(null);
    }
  }, [pointA, pointB, pointC]);

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
    </View>
  );
};

export { TriangleFigureField };
