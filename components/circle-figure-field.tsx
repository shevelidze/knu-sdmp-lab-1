import { PointCoordinatesField } from "./point-coordinates-field";
import { Circle } from "@/classes";
import { useEffect, useState } from "react";
import { Point } from "@/types";
import { View } from "react-native";
import { AppTextInput } from "./app-text-input";
import { useFormState } from "@/hooks";

interface Props {
  onChange: (value: Circle | null) => void;
}

const CircleFigureField: React.FC<Props> = ({ onChange }) => {
  const [center, setCenter] = useFormState<Point | null>(null, "center");
  const [radiusString, setRadiusString] = useFormState("", "radius");

  const runChangeHandlerIfNecessary = (
    nextCenter: Point | null,
    nextRadiusString: string
  ) => {
    const radius = parseFloat(nextRadiusString);

    if (nextCenter && !isNaN(radius)) {
      onChange(new Circle(nextCenter, radius));
    } else {
      onChange(null);
    }
  };

  const handleRadiusInputChange = (text: string) => {
    setRadiusString(text);
  };

  const handleCenterChange = (value: Point | null) => {
    setCenter(value);
  };

  useEffect(() => {
    runChangeHandlerIfNecessary(center, radiusString);
  }, [center, radiusString]);

  return (
    <View>
      <PointCoordinatesField
        value={center}
        onChange={handleCenterChange}
        label="Center"
      />
      <AppTextInput
        placeholder="Radius"
        keyboardType="numeric"
        value={radiusString}
        onChangeText={handleRadiusInputChange}
      />
    </View>
  );
};

export { CircleFigureField };
