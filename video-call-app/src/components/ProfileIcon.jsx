import { CgProfile } from "react-icons/cg";

const ProfileIcon = (props) => {
  return (
    <svg
    width={25}
    height={25}
    {...props}>
      <CgProfile size={24} />
    </svg>
  );
};

export default ProfileIcon;
