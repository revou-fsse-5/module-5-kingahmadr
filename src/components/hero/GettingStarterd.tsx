// GetStarted.jsx
import styles from "./styles";
// import { arrowUp } from "../assets";
const bg_blue_gradient =
  "bg-gradient-to-br from-teal-100 via-teal-200 to-teal-500";
const text_gradient =
  "bg-gradient-to-br from-teal-100 via-teal-200 to-teal-500 bg-clip-text text-black";
const GettingStarted = () => (
  <div
    className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full ${bg_blue_gradient} p-[2px] cursor-pointer`}
  >
    <div
      className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
    >
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className={`${text_gradient} text-black`}>Get</span>
        </p>
        {/* <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" /> */}
      </div>
      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className={text_gradient}>Started</span>
      </p>
    </div>
  </div>
);
export default GettingStarted;
