import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
interface BreadcrumbInterFace {
  title: string;
  subTitle: string;
  Current: string;
}

export default function Breadcrumb({
  title,
  subTitle,
  Current,
}: BreadcrumbInterFace) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          {title}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          {subTitle}
        </Link>
        <Typography color="text.primary">{Current}</Typography>
      </Breadcrumbs>
    </div>
  );
}
