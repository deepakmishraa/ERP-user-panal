import styled from "@emotion/styled";
function Logo() {
  const Logo = styled("img")(() => ({
    height: "35px",
  }));
  return <Logo src={"/logo.png"} alt={"WorldQart Logo"} loading="lazy" />;
}
export default Logo;
