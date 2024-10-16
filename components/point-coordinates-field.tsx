import { Point } from "@/types";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AppTextInput } from "./app-text-input";

interface Props {
  value: Point | null;
  onChange?: (value: Point | null) => void;
  label: string;
}

const PointCoordinatesField: React.FC<Props> = ({ value, onChange, label }) => {
  const [xString, setXString] = useState(value ? value.x.toString() : "");
  const [yString, setYString] = useState(value ? value.y.toString() : "");

  const checkCoordinatesStringValid = (text: string) => {
    return !isNaN(parseFloat(text));
  };

  const createCoordinateChangeHandler = (
    stateSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (text: string) => {
      stateSetter(text);

      let nextXString = xString;
      let nextYString = yString;

      if (stateSetter === setXString) {
        nextXString = text;
      } else {
        nextYString = text;
      }

      if (
        checkCoordinatesStringValid(nextXString) &&
        checkCoordinatesStringValid(nextYString)
      ) {
        onChange?.({
          x: parseFloat(nextXString),
          y: parseFloat(nextYString),
        });
      } else if (nextXString === "" && nextYString === "") {
        onChange?.(null);
      }
    };
  };

  useEffect(() => {
    setXString(value ? value.x.toString() : "");
    setYString(value ? value.y.toString() : "");
  }, [value]);

  return (
    <View>
      <Text>{label}</Text>
      <View style={styles.row}>
        <AppTextInput
          placeholder="X"
          keyboardType="numeric"
          value={xString}
          onChangeText={createCoordinateChangeHandler(setXString)}
          style={styles.input}
        />
        <AppTextInput
          placeholder="Y"
          keyboardType="numeric"
          value={yString}
          onChangeText={createCoordinateChangeHandler(setYString)}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    flex: 1,
  },
});

export { PointCoordinatesField };
