import zero from "../../asset/profilepic/0.png";
import one from "../../asset/profilepic/1.png";
import two from "../../asset/profilepic/2.png";
import three from "../../asset/profilepic/3.png";
import four from "../../asset/profilepic/4.png";
import five from "../../asset/profilepic/5.png";
import six from "../../asset/profilepic/6.png";
import seven from "../../asset/profilepic/7.png";
import eight from "../../asset/profilepic/8.png";
import nine from "../../asset/profilepic/9.png";
import classes from "./ProfilePicSwitch.module.css";

const ProfilePicSwitch = ({ address }) => {
  // console.log("PropicSwitch", address);
  let propicvalue = "";

  const addressReducer = (address) => {
    if (address === undefined) {
      return 999;
    } else {
      let decimal = parseInt((address + "").substring(2, 8), 16);
      return Number((decimal + "").substring(3, 4));
    }
  };
  switch (addressReducer(address)) {
    case 0:
      propicvalue = zero;
      break;
    case 1:
      propicvalue = one;
      break;
    case 2:
      propicvalue = two;
      break;
    case 3:
      propicvalue = three;
      break;
    case 4:
      propicvalue = four;
      break;
    case 5:
      propicvalue = five;
      break;
    case 6:
      propicvalue = six;
      break;
    case 7:
      propicvalue = seven;
      break;
    case 8:
      propicvalue = eight;
      break;
    case 9:
      propicvalue = nine;
      break;
    default:
      console.log(`Propic switch error`);
  }

  return (
    <div>
      {/* <h1>Your Propic no. is {addressReducer(address)}</h1> */}
      <img className={classes.profileImage} src={propicvalue} alt="Profile" />
    </div>
  );
};

export default ProfilePicSwitch;
