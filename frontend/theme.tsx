import * as preact from "preact";
import * as vlens from "vlens";
import { Ref } from "vlens/refs";

type Theme = {
  value: "light" | "dark";
};

const useTheme = vlens.declareHook((): Theme => {
  const stored = localStorage.getItem("theme") as Theme["value"] | null;
  const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const themeValue: Theme["value"] = stored ?? defaultTheme;

  document.documentElement.setAttribute("data-theme", themeValue);
  localStorage.setItem("theme", themeValue);

  return { value: themeValue };
});

export const ThemeToggle = () => {
  let theme = useTheme();
  const themeRef = vlens.ref(theme, "value");
  return (
    <button
      onClick={vlens.cachePartial(themeToggleClicked, themeRef)}
      className="theme-switch"
    >
      {vlens.refGet(themeRef) === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

const themeToggleClicked = (themeRef: Ref) => {
  const next = vlens.refGet(themeRef) === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  vlens.refSet(themeRef, next);
  vlens.scheduleRedraw();
};
