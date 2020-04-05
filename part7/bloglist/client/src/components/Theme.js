import { lighten, darken, transparentize } from "polished";

const makeBrightLevels = (name, baseColor, percent = 0.1) => ({
  [name]: baseColor,
  [name + "Lighter"]: lighten(percent * 3, baseColor),
  [name + "Light"]: lighten(percent, baseColor),
  [name + "Dark"]: darken(percent, baseColor),
  [name + "Darker"]: darken(percent * 2, baseColor)
});

const theme = {
  ...makeBrightLevels("primary", "#49599a"), // color most frequently used across all pages
  ...makeBrightLevels("secondary", "#ffd79b"), // links, action buttons, headlines, progress bars
  background: "#EEF2F7", // surfaces of components like cards, sheets, menus
  ...makeBrightLevels("green", "#5aac44"),
  ...makeBrightLevels("grey", "#ddd", 0.05),
  ...makeBrightLevels("blue", "#00a6ff"),
  ...makeBrightLevels("red", "#e00016"),

  error: "#B00020", // light/dark versions for setting field background-color
  get errorLight() {
    return transparentize(0.9, this.error);
  },
  valid: "#81C784",
  get validLight() {
    return transparentize(0.9, this.valid);
  },
  ...makeBrightLevels("fontDark", "#000"),
  fontLight: "#fff"
};

export default theme;
