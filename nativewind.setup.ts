import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import * as Animatable from "react-native-animatable";

cssInterop(LinearGradient, { className: "style" });
cssInterop(Animatable.View, { className: "style" });
cssInterop(Animatable.Text, { className: "style" });
cssInterop(Animatable.Image, { className: "style" });
