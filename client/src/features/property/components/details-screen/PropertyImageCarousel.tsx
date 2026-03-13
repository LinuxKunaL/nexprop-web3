import { useWindowDimensions, View, Image, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { colors } from "@constants/theme";
import Icon from "@components/display/Icon";
import { useSharedValue } from "react-native-reanimated";
import useWishlist from "@feature/wishlist/hooks/use-wishlist";
import { PropertyDetailsContext } from "@feature/property/details-context";

const PropertyImageCarousel = () => {
  const router = useRouter();
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();
  const { property } = useContext(PropertyDetailsContext);
  const { handleToggleWishlist, isWishlist } = useWishlist(property.id);
  const carouselRef = React.useRef<ICarouselInstance>(null);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (property) {
      setImages([property?.image || "", ...(property?.carouselImages || [])]);
    }
  }, [property]);

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="rounded-xl overflow-hidden w-full h-[314px] justify-center items-center">
      <View
        className="w-full absolute top-0 flex-row justify-between my-4 px-4 z-10"
        testID="top-button"
      >
        <Pressable
          onPress={handleBack}
          className="size-12 border-2 border-white bg-primary/60 rounded-lg justify-center items-center"
        >
          <Icon name="arrow-u-left-top" size={24} color="white" />
        </Pressable>
        <Pressable
          onPress={handleToggleWishlist}
          className="size-12 border-2 border-white bg-primary/80 rounded-lg justify-center items-center"
        >
          <Icon
            name={isWishlist ? "bookmark" : "bookmark-outline"}
            size={24}
            color="white"
          />
        </Pressable>
      </View>
      <Carousel
        width={width}
        data={images || []}
        loop={false}
        ref={carouselRef}
        onProgressChange={progress}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View className="flex-1">
            <Image src={item} className="size-full" key={1} />
          </View>
        )}
      />
      <View className="absolute bottom-0" testID="pagination">
        <Pagination.Basic
          data={images || []}
          progress={progress}
          dotStyle={{
            backgroundColor: colors["card-secondary-dark"],
            borderRadius: 100,
          }}
          activeDotStyle={{
            backgroundColor: colors.background,
            borderRadius: 100,
          }}
          containerStyle={{ gap: 5, marginBottom: 10 }}
          onPress={(index) => {
            carouselRef.current?.scrollTo({ index, animated: true });
          }}
        />
      </View>
    </View>
  );
};

export default PropertyImageCarousel;
