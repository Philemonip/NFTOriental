const ProfilePicSwitch = ({ address }) => {
  // console.log("PropicSwitch", address);

  const addressReducer = (address) => {
    if (address === undefined) {
      return 999;
    } else {
      let decimal = parseInt((address + "").substring(2, 8), 16);
      return (decimal + "").substring(3, 4);
    }
  };

  // console.log(addressReducer(address), "output");

  return (
    <div>
      <h1>Your Propic no. is {addressReducer(address)}</h1>
    </div>
  );
};

export default ProfilePicSwitch;
