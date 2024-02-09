import React from "react";
interface ImgInterface {
  imgUrl: string;
  srcSet?: string;
  height?: string;
  borderRadius?: string;
  shadow?: string;
}
const Img = (props: ImgInterface) => {
  return (
    <React.Fragment>
      <img
        src={props.imgUrl}
        srcSet={props.imgUrl}
        height={props.height ? props.height : "100%"}
        style={{
          borderRadius: props.borderRadius ? props.borderRadius : "5px",
          width: "100%",
          background: "#ccc",
        }}
        loading="lazy"
      />
    </React.Fragment>
  );
};
export default Img;
