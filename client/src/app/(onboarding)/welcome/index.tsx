import { View, Text, StatusBar } from "react-native";
import IntroNature from "@assets/images/intro-nature.svg";
import IntroEth from "@assets/images/intro-eth.svg";
import IntroGPS from "@assets/images/intro-gps.svg";

import { SvgProps } from "react-native-svg";
import React, { useState } from "react";
import Button from "@ui/Button";
import Animated, {
  useSharedValue,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import Indicator from "./Indicator";

type TOnboardingSlides = {
  id: number;
  title: React.ReactNode;
  image: React.FC<SvgProps>;
  description: string;
};

export default function index() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const translateX = useSharedValue<number>(0);

  const onboardingSlides: TOnboardingSlides[] = [
    {
      id: 1,
      title: (
        <React.Fragment>
          <Text className="font-sans font-medium text-2xl text-center text-card-secondary-dark">
            Find best place to stay in{" "}
          </Text>
          <Text className="text-card-dark font-bolds font-semibold text-2xl text-center">
            Good price 😊
          </Text>
        </React.Fragment>
      ),
      image: IntroNature,
      description: "Buy, sell, and bid properties securely using blockchain.",
    },
    {
      id: 2,
      title: (
        <React.Fragment>
          <Text className="font-sans font-medium text-2xl text-center text-card-secondary-dark">
            Safe Payments with Escrow{" "}
          </Text>
          <Text className="text-card-dark font-bolds font-semibold text-2xl text-center">
            In secure way 🔒
          </Text>
        </React.Fragment>
      ),
      image: IntroEth,
      description:
        "Your funds are held safely in escrow until you verify property documents.",
    },
    {
      id: 3,
      title: (
        <React.Fragment>
          <Text className="font-sans font-medium text-2xl text-center text-card-secondary-dark">
            Find Properties by Location.{" "}
          </Text>
          <Text className="text-card-dark font-bolds font-semibold text-2xl text-center">
            Via GPS📍
          </Text>
        </React.Fragment>
      ),
      image: IntroGPS,
      description:
        "Engage with verified real estate agents for a seamless experience.",
    },
  ];

  const CurrentImage = onboardingSlides[currentSlide]?.image;

  const handleNextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      translateX.value += 19.3;
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <View className="h-screen g-primary" testID="page">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View
        key={`image-${currentSlide}`}
        entering={FadeIn}
        exiting={FadeOut}
        className="flex flex-1 top-0"
        testID="intro-image"
      >
        <CurrentImage
          width={"100%"}
          height={"100%"}
          fill="#fff"
          preserveAspectRatio="xMidYMid slice"
        />
      </Animated.View>
      <View
        className="absolute flex items-center justify-center flex-col w-full h-full"
        testID="intro-content-container"
      >
        <View className="flex-1" testID="dummyView" />
        <View className="flex-1" testID="dummyView" />
        <View
          className="items-center z-10 justify-center flex-1 w-full px-4"
          testID="intro-content"
        >
          <Indicator translateX={translateX.value} />
          <Animated.View
            key={`title-${currentSlide}`}
            entering={FadeIn}
            exiting={FadeOut}
            className="flex flex-col"
            testID="intro-title"
          >
            {onboardingSlides[currentSlide]?.title}
          </Animated.View>
          <Animated.Text
            key={`desc-${currentSlide}`}
            entering={FadeIn}
            exiting={FadeOut}
            className="text-center text-base font-sans text-muted mt-4 mb-8 px-10"
            testID="intro-description"
          >
            {onboardingSlides[currentSlide]?.description}
          </Animated.Text>
          <Button
            variant="solid"
            size="md"
            fontSize="lg"
            onPress={handleNextSlide}
          >
            {currentSlide === onboardingSlides.length - 1
              ? "Get Started"
              : "Next"}
          </Button>
        </View>
      </View>
    </View>
  );
}
