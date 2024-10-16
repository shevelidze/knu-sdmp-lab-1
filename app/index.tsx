import {
  CircleFigureField,
  QuadrangleFigureField,
  TriangleFigureField,
} from "@/components";
import { EllipseFigureField } from "@/components/ellipse-figure-field";
import { FigureName } from "@/enums";
import { Figure } from "@/types";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Text,
  ToastAndroid,
  ScrollView,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import RNPickerSelect, { Item } from "react-native-picker-select";
import * as FileSystem from "expo-file-system";
import Svg, { Path, Rect } from "react-native-svg";

const FIGURE_NAME_TO_LABEL: Record<FigureName, string> = {
  [FigureName.TRIANGLE]: "Triangle",
  [FigureName.QUADRANGLE]: "Quadrangle",
  [FigureName.CIRCLE]: "Circle",
  [FigureName.ELLIPSE]: "Ellipse",
};

const FIGURES_SELECT_ITEMS = Object.values(FigureName).map(
  (figureName): Item => ({
    label: FIGURE_NAME_TO_LABEL[figureName as FigureName],
    value: figureName,
    key: figureName,
  })
);

export default function Index() {
  const [figureName, setFigureName] = useState<FigureName | null>(null);
  const [figure, setFigure] = useState<Figure | null>(null);
  const [doesFileExist, setDoesFileExist] = useState<boolean>(false);

  const figureArea = useMemo(() => {
    if (figure) {
      return figure.area;
    }

    return null;
  }, [figure]);

  const figurePerimeter = useMemo(() => {
    if (figure) {
      return figure.perimeter;
    }

    return null;
  }, [figure]);

  const FigureField = useMemo(() => {
    switch (figureName) {
      case FigureName.TRIANGLE:
        return TriangleFigureField;
      case FigureName.QUADRANGLE:
        return QuadrangleFigureField;
      case FigureName.CIRCLE:
        return CircleFigureField;
      case FigureName.ELLIPSE:
        return EllipseFigureField;
      default:
        return () => null;
    }
  }, [figureName]);

  useEffect(() => {
    FileSystem.getInfoAsync(fileUri).then(({ exists }) => {
      setDoesFileExist(exists);
    });
  }, []);

  const fileUri = `${FileSystem.documentDirectory}/figure.json`;

  const saveData = async () => {
    if (!figure) {
      return;
    }

    await FileSystem.writeAsStringAsync(
      fileUri,
      JSON.stringify({
        type: figure.name,
        perimeter: figure.perimeter,
        area: figure.area,
      })
    );

    setDoesFileExist(true);

    ToastAndroid.show("Saved into figure.json", ToastAndroid.SHORT);
  };

  const readFile = async () => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);

      Alert.alert("Saved data", fileContent);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFile = async () => {
    try {
      await FileSystem.deleteAsync(fileUri);

      setDoesFileExist(false);

      ToastAndroid.show("Deleted figure.json", ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Area: {figureArea}</Text>
        <Text>Perimeter: {figurePerimeter}</Text>
        <RNPickerSelect
          placeholder={{
            label: "Select a figure",
            value: null,
            key: "placeholder",
          }}
          onValueChange={(value) => setFigureName(value)}
          items={FIGURES_SELECT_ITEMS}
          style={{
            inputAndroid: styles.input,
          }}
          useNativeAndroidPickerStyle={false}
        />
        <FigureField onChange={setFigure} />
        <Button title="Save to file" onPress={saveData} disabled={!figure} />
        <Button
          title="Read from file"
          onPress={readFile}
          disabled={!doesFileExist}
        />
        <Button
          title="Remove file"
          onPress={removeFile}
          disabled={!doesFileExist}
        />
        <Svg width="300px" height="300px" viewBox="0 0 10 10">
          {/* <Rect x='0' y='0' width='100' height='100' fill='red' /> */}
          {figure && figure.render()}
        </Svg>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 10,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da", // Light gray border
    borderRadius: 10, // Rounded corners
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    elevation: 2, // Shadow effect for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 15,
  },
});
