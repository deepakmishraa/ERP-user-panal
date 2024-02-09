import CenterBox from "../../core/CenterBox";
import Card from "./Card";
import Iconify from "../../core/Iconify";
const SocialMedia = () => {
  return (
    <CenterBox gap="26px">
      <Card link="/facebook">
        <Iconify icon="ic:twotone-facebook" />
      </Card>
      <Card link="/twitter">
        <Iconify icon="pajamas:twitter" />
      </Card>
      <Card link="/linkedIn">
        <Iconify icon="cib:linkedin-in" />
      </Card>
      <Card link="/instagram">
        <Iconify icon="basil:instagram-outline" />
      </Card>
    </CenterBox>
  );
};
export default SocialMedia;
