import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { lightPalette } from "../assets/palette/lightPalette";
import { darkPalette } from "../assets/palette/darkPalette";

const mode: PaletteMode = "light" as PaletteMode;

const themePalette = mode === "light" ? lightPalette : darkPalette;

const theme = createTheme({
  palette: {
    mode: mode,
    ...themePalette,
  },
  typography: {
    fontFamily: "Amazon Ember", // Replace with the font from your design if different
    fontSize: 12, // Base font size
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 900, // This is a custom property, make sure to add it to the theme augmentation
    h1: {
      fontSize: "2rem", // Replace with the actual value from your design
      fontWeight: 700,
      lineHeight: 1, // Replace with the actual value from your design
    },
    h2: {
      fontSize: "3.75rem", // Replace with the actual value from your design
      fontWeight: 700,
      lineHeight: 1.2, // Replace with the actual value from your design
    },
    h3: {
      fontSize: "1.7rem", // Replace with the actual value from your design
      fontWeight: 700,
      lineHeight: 1.167, // Replace with the actual value from your design
    },
    h4: {
      fontSize: "1.3rem", // Replace with the actual value from your design
      fontWeight: 700,
      lineHeight: 1.235, // Replace with the actual value from your design
    },
    h5: {
      fontSize: "1.5rem", // Standard MUI size or replace with your design
      fontWeight: 500, // You can adjust this
      lineHeight: 1.334, // You can adjust this
    },
    h6: {
      fontSize: "1.25rem", // Standard MUI size or replace with your design
      fontWeight: 500, // You can adjust this
      lineHeight: 1.6, // You can adjust this
    },
    subtitle1: {
      fontSize: "1rem", // Standard MUI size or replace with your design
      fontWeight: 500, // You can adjust this
      lineHeight: 1.75, // You can adjust this
    },
    subtitle2: {
      fontSize: "0.875rem", // Standard MUI size or replace with your design
      fontWeight: 500, // You can adjust this
      lineHeight: 1.57, // You can adjust this
    },
    body1: {
      fontSize: "1rem", // Standard MUI size or replace with your design
      fontWeight: 400, // Regular weight
      lineHeight: 1.5, // Standard MUI line height
    },
    body2: {
      fontSize: "0.875rem", // Standard MUI size or replace with your design
      fontWeight: 500, // Regular weight
      lineHeight: 1.43, // Standard MUI line height
    },
    button: {
      fontSize: "0.875rem", // Standard MUI size or replace with your design
      fontWeight: 500, // Typically buttons have medium weight
      lineHeight: 1.75, // This can be adjusted based on your design
      textTransform: "uppercase", // If your buttons should be uppercase
    },
    caption: {
      fontSize: "0.75rem", // Standard MUI size or replace with your design
      fontWeight: 400, // Captions are usually lighter
      lineHeight: 1.66, // This can be adjusted based on your design
    },
    overline: {
      fontSize: "0.75rem", // Standard MUI size or replace with your design
      fontWeight: 400, // Overlines are usually lighter
      lineHeight: 2.66, // This can be adjusted based on your design
      textTransform: "uppercase", // Overlines are often uppercase
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "0.7rem", // Example radius
          boxShadow: "none",
          fontWeight: "600",
        },
        standardSuccess: {
          backgroundColor:
            mode === "light"
              ? lightPalette.success.lighter
              : darkPalette.success.lighter,
          color:
            mode === "light"
              ? lightPalette.success.darker
              : darkPalette.success.darker,
          "& .MuiAlert-icon": {
            color:
              mode === "light"
                ? lightPalette.success.dark
                : darkPalette.success.dark,
          },
        },
        standardError: {
          backgroundColor:
            mode === "light"
              ? lightPalette.error.lighter
              : darkPalette.error.lighter,
          color:
            mode === "light"
              ? lightPalette.error.darker
              : darkPalette.error.darker,
          "& .MuiAlert-icon": {
            color:
              mode === "light"
                ? lightPalette.error.dark
                : darkPalette.error.dark,
          },
        },
        standardWarning: {
          backgroundColor:
            mode === "light"
              ? lightPalette.warning.lighter
              : darkPalette.warning.lighter,
          color:
            mode === "light"
              ? lightPalette.warning.darker
              : darkPalette.warning.darker,
          "& .MuiAlert-icon": {
            color:
              mode === "light"
                ? lightPalette.warning.dark
                : darkPalette.warning.dark,
          },
        },
        standardInfo: {
          backgroundColor:
            mode === "light"
              ? lightPalette.info.lighter
              : darkPalette.info.lighter,
          color:
            mode === "light"
              ? lightPalette.info.darker
              : darkPalette.info.darker,
          "& .MuiAlert-icon": {
            color:
              mode === "light" ? lightPalette.info.dark : darkPalette.info.dark,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          borderRadius: "0.7rem",
        },
        colorPrimary: {
          color:
            mode === "light"
              ? lightPalette.primary.lighter
              : darkPalette.primary.lighter,
          "&:hover": {
            color:
              mode === "light"
                ? lightPalette.primary.light
                : darkPalette.primary.light,
          },
        },
        colorSecondary: {
          color: lightPalette.secondary.main,
          "&:hover": {
            color: lightPalette.secondary.dark,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          borderRight: "none",
        },
        paper: {
          borderRight: "1px dashed #ccc",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: "1px dashed #ccc",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          p: 0,
          color: lightPalette.secondary.main,
          marginBottom: 5,
          "& .MuiTypography-root": {
            fontWeight: "600",
            fontSize: "15px",
          },
          "&.Mui-selected": {
            backgroundColor: lightPalette.primary.lighter,
            color: lightPalette.primary.main,
          },
          "&:hover": {
            backgroundColor: lightPalette.primary.light,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "30px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          height: "40px",
          width: "40px",
        },
        colorSecondary: {
          height: "40px",
          width: "40px",
          background: lightPalette.secondary.main,
          color: lightPalette.background.paper,
          "&:hover": {
            background: lightPalette.secondary.darker,
            color: lightPalette.secondary.lighter,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: "30px",
          height: "30px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: lightPalette.divider,
        },
        flexItem: {
          border: `1px dashed ${lightPalette.divider}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {},
        elevation1: {
          boxShadow:
            "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
          padding: "40px 24px",
          borderRadius: "1.6rem",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        elevation2: {
          boxShadow:
            "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
          padding: "24px",
          borderRadius: "1.6rem",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        elevation3: {
          boxShadow:
            "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
          padding: "0px",
          borderRadius: "1.6rem",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {},
        containedSecondary: {
          borderRadius: "1rem",
          fontWeight: "700",
          background: lightPalette.secondary.darker,
          "&:hover": {
            background: lightPalette.secondary.main,
          },
        },
        containedPrimary: {
          borderRadius: "0.5rem",
          fontWeight: "700",
          background: lightPalette.primary.main,
          color: lightPalette.background.paper,
          boxShadow: "none",
          "&:hover": {
            // transition: "background 1s linear 1s",
            background: lightPalette.primary.dark,
          },
        },
        outlinedPrimary: {
          borderRadius: "1rem",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {},
        stickyHeader: {},
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: lightPalette.background.default,
          fontSize: "0.1rem",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        // root: {
        //   padding: "1rem",
        // },
        sizeMedium: {
          padding: "0.7rem",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: lightPalette.primary.main,
          "&:hover": {
            color: lightPalette.secondary.main,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: lightPalette.secondary.main,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: lightPalette.secondary.main, // Replace with actual color string or reference from theme
          },
          "& .MuiFormLabel": {
            fontWeight: 600,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: 14,
          "&.Mui-focused": {
            color: lightPalette.secondary.main,
          },
        },
      },
    },
  },
});

export default theme;
