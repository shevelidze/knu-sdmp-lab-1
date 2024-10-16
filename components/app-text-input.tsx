import { StyleSheet, TextInput } from "react-native";

const AppTextInput: React.FC<React.ComponentProps<typeof TextInput>> = ({
  style,
  ...props
}) => {
  return <TextInput style={[style, styles.input]} {...props} />;
};

const styles = StyleSheet.create({
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

export { AppTextInput };
