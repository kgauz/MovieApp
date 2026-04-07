import React, { useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";
import HorizontalArrows from "./horizontalArrows";

export default function HorizontalSection({
  title,
  data,
  renderItem,
  cardWidth,
  spacing,
  isDesktop,
}: any) {
  const listRef = useRef<FlatList>(null);
  const [currentOffset, setCurrentOffset] = useState(0);

  const scrollAmount = cardWidth * 3;

  const scrollLeft = () => {
    listRef.current?.scrollToOffset({
      offset: Math.max(currentOffset - scrollAmount, 0),
      animated: true,
    });
  };

  const scrollRight = () => {
    listRef.current?.scrollToOffset({
      offset: currentOffset + scrollAmount,
      animated: true,
    });
  };

  return (
    <View>
      <Text style={{ color: "#fff", margin: 10, marginTop: 20, fontSize: 20 }}>
        {title}
      </Text>

      <View style={{ position: "relative" }}>
        <FlatList
          ref={listRef}
          horizontal
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) =>
            setCurrentOffset(e.nativeEvent.contentOffset.x)
          }
          scrollEventThrottle={16}
          renderItem={renderItem}
        />

        <HorizontalArrows
          isDesktop={isDesktop}
          currentOffset={currentOffset}
          onLeft={scrollLeft}
          onRight={scrollRight}
        />
      </View>
    </View>
  );
}