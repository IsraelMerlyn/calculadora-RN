import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Style } from "../styles/GlobalStyle";
import { ThemeContext } from "../context/ThemeContex";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

export function Button({ title, isBlue, isGray, onPress }: ButtonProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={
        isBlue
          ? Style.btnBlue
          : isGray
          ? Style.btnGray
          : theme === "light"
          ? Style.btnLight
          : Style.btnDark
      }
      onPress={onPress}
    >
      <Text
        style={
          isBlue || isGray
            ? Style.smallTextLight
            : theme === "dark"
            ? Style.smallTextLight
            : Style.smallTextDark
        }
      >
        {" "}
        {title}
      </Text>
    </TouchableOpacity>
  );
}
