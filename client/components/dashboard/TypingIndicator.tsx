import Lottie from "lottie-react";
import TypingAnimation from "../../public/lotti-animation/typing-indicator.json";

const TypingIndicator = () => {
  return (
    <div className="relative mx-4">
      <div className=" -left-[13px] absolute top-0 z-[1]">
        <svg
          viewBox="0 0 8 13"
          height="32.5"
          width="20"
          version="1.1"
          x="0px"
          y="0px"
        >
          <path
            opacity="0.13"
            fill="#0000000"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            className="fill-secondary"
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      </div>
      <div className="shadow-message mb-1 z-[10] w-24 h-10 bg-secondary relative overflow-hidden rounded-lg">
        <Lottie
          className="absolute -top-[130%] -left-[50%] w-[200%]"
          animationData={TypingAnimation}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
