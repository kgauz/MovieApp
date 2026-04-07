
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isDesktop: boolean;
  currentOffset: number;
  onLeft: () => void;
  onRight: () => void;
};

export default function HorizontalArrows({
  isDesktop,
  currentOffset,
  onLeft,
  onRight,
}: Props) {
  if (!isDesktop) return null;

  return (
    <>
      {currentOffset > 0 && (
        <TouchableOpacity
          onPress={onLeft}
          style={{
            position: "absolute",
            left: 0,
            top: "40%",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: 10,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={onRight}
        style={{
          position: "absolute",
          right: 0,
          top: "40%",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: 10,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Ionicons name="chevron-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </>
  );
}