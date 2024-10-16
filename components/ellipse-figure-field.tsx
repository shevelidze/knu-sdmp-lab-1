import { PointCoordinatesField } from "./point-coordinates-field";
import { Ellipse } from "@/classes";
import { useState } from "react";
import { Point } from "@/types";
import { View } from "react-native";
import { AppTextInput } from "./app-text-input";

interface Props {
  onChange: (value: Ellipse | null) => void;
}

const EllipseFigureField: React.FC<Props> = ({ onChange }) => {
  const [center, setCenter] = useState<Point | null>(null);
  const [xRadiusString, setXRadiusString] = useState("");
  const [yRadiusString, setYRadiusString] = useState("");

  const runChangeHandlerIfNecessary = (
    nextCenter: Point | null,
    nextXRadiusString: string,
    nextYRadiusString: string
  ) => {
    const xRadius = parseFloat(nextXRadiusString);
    const yRadius = parseFloat(nextYRadiusString);

    if (nextCenter && !isNaN(xRadius) && !isNaN(yRadius)) {
      onChange(new Ellipse(nextCenter, xRadius, yRadius));
    } else {
      onChange(null);
    }
  };

  const handleXRadiusInputChange = (text: string) => {
    setXRadiusString(text);

    runChangeHandlerIfNecessary(center, text, yRadiusString);
  };

  const handleYRadiusInputChange = (text: string) => {
    setYRadiusString(text);

    runChangeHandlerIfNecessary(center, xRadiusString, text);
  };

  const handleCenterChange = (value: Point | null) => {
    setCenter(value);

    runChangeHandlerIfNecessary(value, xRadiusString, yRadiusString);
  };

  return (
    <View>
      <PointCoordinatesField
        value={center}
        onChange={handleCenterChange}
        label="Center"
      />
      <AppTextInput
        placeholder="X radius"
        keyboardType="numeric"
        value={xRadiusString}
        onChangeText={handleXRadiusInputChange}
      />
      <AppTextInput
        placeholder="Y radius"
        keyboardType="numeric"
        value={yRadiusString}
        onChangeText={handleYRadiusInputChange}
      />
    </View>
  );
};

export { EllipseFigureField };
