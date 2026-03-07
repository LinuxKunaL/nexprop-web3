import { useWindowDimensions, View, Image, Pressable } from "react-native";
import React from "react";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import Icon from "@ui/Icon";
import { useSharedValue } from "react-native-reanimated";
import { colors } from "@constants/theme";
import { useRouter } from "expo-router";

type Props = {
  images: string[] | undefined;
};

const PropertyImageCarousel = ({ images }: Props) => {
  const router = useRouter();
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();
  const carouselRef = React.useRef<ICarouselInstance>(null);

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
        <View className="size-12 border-2 border-white bg-primary/80 rounded-lg justify-center items-center">
          <Icon name="bookmark" size={24} color="white" />
        </View>
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
