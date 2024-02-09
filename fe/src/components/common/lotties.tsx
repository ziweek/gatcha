import Lottie from "react-lottie-player";
import lottieCongratulationsJson from "../../../public/lotties/congratulations.json";
import lottieHiJson from "../../../public/lotties/hi.json";
import lottieDebate from "../../../public/lotties/debate.json";
import lottieCardStack from "../../../public/lotties/card-stack.json";
import lottieComplete from "../../../public/lotties/complete.json";
import lottieWalkingBox from "../../../public/lotties/walking-box.json";
import lottieVotingBox from "../../../public/lotties/voting-box.json";
import lottieChatbot from "../../../public/lotties/chatbot.json";

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

export function LottieDebate(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieDebate}
      play
      style={{ width: params.width, height: params.height }}
      //   onComplete={props.onComplete}
    />
  );
}

export function LottieCardStack(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieCardStack}
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

export function LottieWalkingBox(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieWalkingBox}
      play={params.play || true}
      style={{ width: params.width, height: params.height }}

      //   onComplete={props.onComplete}
    />
  );
}

export function LottieVotingBox(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieVotingBox}
      play={params.play || true}
      style={{ width: params.width, height: params.height }}

      //   onComplete={props.onComplete}
    />
  );
}

export function LottieChatbot(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieChatbot}
      play={params.play || true}
      style={{ width: params.width, height: params.height }}

      //   onComplete={props.onComplete}
    />
  );
}
