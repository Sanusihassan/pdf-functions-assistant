import { useCallback, useEffect, useState } from "react";
import { getLanguage } from "./language";

export const usePrependLangToUrl = () => {
    const [lang, setLang] = useState("");

    useEffect(() => {
        setLang(getLanguage() ?? "");
    }, []);

    return useCallback(
        (url: string): string => {
            if (lang && lang !== "") {
                return `/${lang}${url}`;
            }
            return url;
        },
        [lang]
    );
};
