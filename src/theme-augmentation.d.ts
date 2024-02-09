// theme-augmentation.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontWeightExtraBold: React.CSSProperties['fontWeight'];
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    fontWeightExtraBold?: React.CSSProperties['fontWeight'];
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fontWeightExtraBold: true;
  }
}
