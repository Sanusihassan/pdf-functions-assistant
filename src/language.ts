import Cookies from "js-cookie";

export const setLanguage = (language: string) => {
  Cookies.set("languageToken", language, { expires: 365 });
};

export const getLanguage = () => {
  return Cookies.get("languageToken") || "en";
};
