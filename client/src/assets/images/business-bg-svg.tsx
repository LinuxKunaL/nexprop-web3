import { View } from "react-native";
import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { useThemeStore } from "@stores/theme.store";
import { generateDarkShades } from "@utils/generateDarkShades";

type Props = {
  className: string;
};

const BusinessBgSvg = (props: Props) => {
  const colors = useThemeStore((st) => st.colors);
  
  const colorShadeDark = generateDarkShades(colors.primary, 1.5);
  const colorShadeDark2 = generateDarkShades(colors.primary, 1.1);

  return (
    <View className={props.className}>
      <Svg id="visual">
        <G
          xmlns="http://www.w3.org/2000/svg"
          stroke-width="1"
          stroke-linejoin="bevel"
        >
          <Path
            d="M449 318L438 391L505 357Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M438 391L448 437L505 357Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M505 357L542 305L449 318Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M449 318L367 378L438 391Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M438 391L368 439L448 437Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M394 221L363 320L449 318Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M449 318L363 320L367 378Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M448 437L529 455L505 357Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M505 357L589 391L542 305Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M314 380L368 439L367 378Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M367 378L368 439L438 391Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M448 437L511 539L529 455Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M529 455L589 391L505 357Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M534 243L443 225L449 318Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M616 287L534 243L542 305Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M542 305L534 243L449 318Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M363 320L314 380L367 378Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M443 225L394 221L449 318Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M363 320L319 289L314 380Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M394 221L319 289L363 320Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M589 391L616 287L542 305Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M322 464L396 515L368 439Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M368 439L396 515L448 437Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M529 455L619 432L589 391Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M589 391L667 319L616 287Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M620 516L619 432L529 455Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M314 380L322 464L368 439Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M616 287L588 222L534 243Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M534 243L539 150L443 225Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M443 225L380 141L394 221Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M450 600L431 541L357 600Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M396 515L431 541L448 437Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M431 541L511 539L448 437Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M683 396L667 319L589 391Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M669 218L600 168L588 222Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M242 316L244 365L314 380Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M314 380L218 459L322 464Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M620 516L668 439L619 432Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M619 432L683 396L589 391Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M600 168L539 150L588 222Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M588 222L539 150L534 243Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M511 539L620 516L529 455Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M668 439L683 396L619 432Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M244 229L242 316L319 289Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M319 289L242 316L314 380Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M380 141L297 204L394 221Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M394 221L297 204L319 289Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M539 150L471 129L443 225Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M471 129L380 141L443 225Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M669 218L588 222L616 287Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M513 64L457 83L471 129Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M357 600L431 541L396 515Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M431 541L450 600L511 539Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M511 539L600 600L620 516Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M218 459L290 529L322 464Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M322 464L290 529L396 515Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M742 313L669 218L667 319Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M667 319L669 218L616 287Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M450 600L531 600L511 539Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M277 136L244 229L297 204Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M297 204L244 229L319 289Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M290 529L357 600L396 515Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M164 375L218 459L244 365Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M244 365L218 459L314 380Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M290 529L307 600L357 600Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M164 375L244 365L242 316Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M513 64L471 129L539 150Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M471 129L393 89L380 141Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M380 141L277 136L297 204Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M457 83L393 89L471 129Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M531 600L600 600L511 539Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M731 528L746 433L668 439Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M755 390L742 313L683 396Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M683 396L742 313L667 319Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M746 433L683 396L668 439Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M246 600L307 600L290 529Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M291 61L277 136L380 141Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M692 546L668 439L620 516Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M746 433L755 390L683 396Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M680 600L692 546L620 516Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M744 223L693 170L669 218Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M669 218L693 170L600 168Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M585 58L513 64L539 150Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M585 58L539 150L600 168Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M386 0L291 61L393 89Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M162 280L164 375L242 316Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M218 459L213 534L290 529Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M162 280L242 316L244 229Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M164 461L213 534L218 459Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M132 224L162 280L244 229Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M742 313L744 223L669 218Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M811 222L744 223L742 313Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M132 538L164 461L73 447Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M164 375L164 461L218 459Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M762 600L731 528L692 546Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M692 546L731 528L668 439Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M746 433L806 436L755 390Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M652 76L585 58L600 168Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M224 67L221 141L277 136Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M277 136L221 141L244 229Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M600 600L680 600L620 516Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M147 600L246 600L213 534Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M213 534L246 600L290 529Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M693 170L652 76L600 168Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M768 63L652 76L693 170Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M393 89L291 61L380 141Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M452 0L393 89L457 83Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M452 0L457 83L513 64Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M829 523L806 436L731 528Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M731 528L806 436L746 433Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M755 390L820 364L742 313Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M806 436L820 364L755 390Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M221 141L132 224L244 229Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M162 280L76 287L164 375Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M141 134L132 224L221 141Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M525 0L513 64L585 58Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M525 0L452 0L513 64Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M811 222L765 163L744 223Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M744 223L765 163L693 170Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M611 0L525 0L585 58Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M452 0L386 0L393 89Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M900 372L830 322L820 364Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M820 364L830 322L742 313Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M830 322L811 222L742 313Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M243 0L224 67L291 61Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M291 61L224 67L277 136Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M73 447L164 461L164 375Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M164 461L132 538L213 534Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M680 600L762 600L692 546Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M677 0L611 0L652 76Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M652 76L611 0L585 58Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M386 0L308 0L291 61Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M163 94L141 134L221 141Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M54 216L76 287L132 224Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M132 224L76 287L162 280Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M132 538L147 600L213 534Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M224 67L163 94L221 141Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M143 0L163 94L224 67Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M60 366L73 447L164 375Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M132 538L74 600L147 600Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M762 600L829 523L731 528Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M806 436L900 372L820 364Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M76 287L60 366L164 375Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M727 0L677 0L652 76Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M768 63L693 170L765 163Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M900 206L815 133L811 222Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M811 222L815 133L765 163Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M308 0L243 0L291 61Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M815 133L768 63L765 163Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M62 142L54 216L132 224Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M0 317L0 370L60 366Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M62 142L132 224L141 134Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M62 142L141 134L77 79Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M900 467L900 372L806 436Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M830 322L900 316L811 222Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M900 372L900 316L830 322Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M0 370L73 447L60 366Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M0 470L53 516L73 447Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M73 447L53 516L132 538Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M768 63L727 0L652 76Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M816 0L727 0L768 63Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M762 600L837 600L829 523Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M829 523L900 467L806 436Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M900 546L900 467L829 523Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M77 79L141 134L163 94Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M53 516L74 600L132 538Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M900 56L813 58L815 133Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M815 133L813 58L768 63Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M900 316L900 206L811 222Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M0 317L60 366L76 287Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M53 516L0 544L74 600Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M0 317L76 287L0 233Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M0 233L76 287L54 216Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M837 600L900 546L829 523Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M143 0L77 79L163 94Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M0 137L0 233L54 216Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M0 370L0 470L73 447Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M0 137L54 216L62 142Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M243 0L143 0L224 67Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M900 206L900 137L815 133Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M0 470L0 544L53 516Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M837 600L900 600L900 546Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M900 56L816 0L813 58Z"
            fill={colorShadeDark.dark}
            stroke={colorShadeDark.dark}
          />
          <Path
            d="M813 58L816 0L768 63Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M77 79L0 137L62 142Z"
            fill={colorShadeDark2.darker}
            stroke={colorShadeDark2.darker}
          />
          <Path
            d="M0 55L0 137L77 79Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M0 544L0 600L74 600Z"
            fill={colors.primary}
            stroke={colors.primary}
          />
          <Path
            d="M900 137L900 56L815 133Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
          <Path
            d="M143 0L60 0L77 79Z"
            fill={colorShadeDark2.dark}
            stroke={colorShadeDark2.dark}
          />
          <Path
            d="M60 0L0 55L77 79Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M900 56L900 0L816 0Z"
            fill={colorShadeDark.darker}
            stroke={colorShadeDark.darker}
          />
          <Path
            d="M60 0L0 0L0 55Z"
            fill={colors["primary/20"]}
            stroke={colors["primary/20"]}
          />
        </G>
      </Svg>
    </View>
  );
};

export default BusinessBgSvg;
