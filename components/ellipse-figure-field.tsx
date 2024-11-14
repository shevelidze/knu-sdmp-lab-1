import { PointCoordinatesField } from "./point-coordinates-field";
import { Ellipse } from "@/classes";
import { useEffect, useState } from "react";
import { Point } from "@/types";
import { View } from "react-native";
import { AppTextInput } from "./app-text-input";
import { useFormState } from "@/hooks";

interface Props {
  onChange: (value: Ellipse | null) => void;
}

const EllipseFigureField: React.FC<Props> = ({ onChange }) => {
  const [center, setCenter] = useFormState<Point | null>(null, "center");
  const [xRadiusString, setXRadiusString] = useFormState("", "xRadius");
  const [yRadiusString, setYRadiusString] = useFormState("", "yRadius");

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
  };

  const handleYRadiusInputChange = (text: string) => {
    setYRadiusString(text);
  };

  const handleCenterChange = (value: Point | null) => {
    setCenter(value);
  };

  useEffect(() => {
    runChangeHandlerIfNecessary(center, xRadiusString, yRadiusString);
  }, [center, xRadiusString, yRadiusString]);

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
