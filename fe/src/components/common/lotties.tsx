import Lottie from "react-lottie-player";
import lottieCongratulationsJson from "../../../public/lotties/congratulations.json";
import lottieHiJson from "../../../public/lotties/hi.json";
import lottieComplete from "../../../public/lotties/complete.json";
import lottieUserWithPet from "../../../public/lotties/user-with-pet.json";

type PropsForLottie = {
  width?: any;
  height?: any;
  loop?: boolean;
  play?: boolean;
};

export function LottieCongratulations(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieCongratulationsJson}
      play
      style={{ width: params.width, height: params.height }}
      //   onComplete={props.onComplete}
    />
  );
}

export function LottieHi(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieHiJson}
      play
      style={{ width: params.width, height: params.height }}
      //   onComplete={props.onComplete}
    />
  );
}

export function LottieComplete(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieComplete}
      play={params.play}
      style={{ width: params.width, height: params.height }}

      //   onComplete={props.onComplete}
    />
  );
}

export function LottieUserWithPet(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieUserWithPet}
      play={params.play}
      style={{ width: params.width, height: params.height }}

      //   onComplete={props.onComplete}
    />
  );
}
