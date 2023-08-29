import { useState } from "react";
import * as React from "react";
import { Switch, Text, View } from "react-native";
import { Style } from "../styles/GlobalStyle";
import { Button } from "./Button";
import { myColors } from "../styles/Colors";

export function MyKeyboard() {
  const [firstNumber, setfirstNumber] = React.useState("");
  const [secondNumber, setsecondNumber] = React.useState("");
  const [operation, setoperation] = React.useState("");
  const [result, setresult] = React.useState<number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setfirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setoperation(buttonValue);
    setsecondNumber(firstNumber);
    setfirstNumber("");
  };

  const clear = () => {
    setfirstNumber("");
    setsecondNumber("");
    setoperation("");
    setresult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 909
              ? [Style.screenFirstNumber, { color: myColors.result }]
              : [
                  Style.screenFirstNumber,
                  { fontSize: 50, color: myColors.result },
                ]
          }
        >
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Style.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={Style.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Style.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Style.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setresult(parseInt(secondNumber) + parseInt(firstNumber));
        break;
      case "-":
        clear();
        setresult(parseInt(secondNumber) - parseInt(firstNumber));
        break;
      case "*":
        clear();
        setresult(parseInt(secondNumber) * parseInt(firstNumber));
        break;
      case "/":
        clear();
        setresult(parseInt(secondNumber) / parseInt(firstNumber));
        break;
      default:
        clear();
        setresult(0);
        break;
    }
  };

  return (
    <View style={Style.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Style.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Style.row}>
        <Button title="C" isGray onPress={clear} />
        <Button
          title="+/-"
          isGray
          onPress={() => handleOperationPress("+/-")}
        />
        <Button title="％" isGray onPress={() => handleOperationPress("％")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Style.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Style.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Style.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Style.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button
          title="⌫"
          onPress={() => setfirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
}
