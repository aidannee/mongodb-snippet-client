import { createContext, useState } from "react";

export const ApplicationSettingsContext = createContext(null);

export const ApplicationSettingsProvider = ({ children }) => {
  // this is for the editor and nav bar
  const initialThemeState =
    localStorage.getItem("darkMode") === "true" ? true : false;
  const [darkMode, setDarkMode] = useState(initialThemeState);

  const toggleDarkMode = () => {
    console.log("words");
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };
  return (
    <ApplicationSettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ApplicationSettingsContext.Provider>
  );
};
