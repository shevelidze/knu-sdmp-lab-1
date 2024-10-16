import { PointCoordinatesField } from "./point-coordinates-field";
import { Circle } from "@/classes";
import { useState } from "react";
import { Point } from "@/types";
import { View } from "react-native";
import { AppTextInput } from "./app-text-input";

interface Props {
  onChange: (value: Circle | null) => void;
}

const CircleFigureField: React.FC<Props> = ({ onChange }) => {
  const [center, setCenter] = useState<Point | null>(null);
  const [radiusString, setRadiusString] = useState("");

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

    runChangeHandlerIfNecessary(center, text);
  };

  const handleCenterChange = (value: Point | null) => {
    setCenter(value);

    runChangeHandlerIfNecessary(value, radiusString);
  };

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
