import { useEffect, useRef, type Dispatch, type RefObject, type SetStateAction } from "react";

interface FontSizeSelectProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
    decreaseSizeRef: RefObject<HTMLButtonElement>;
    increaseSizeRef: RefObject<HTMLButtonElement>;
}

export const FontSizeSelect: React.FC<FontSizeSelectProps> = ({
    isOpen,
    setIsOpen,
    fontSize,
    setFontSize,
    decreaseSizeRef,
    increaseSizeRef,
}) => {
    const dropdownRef = useRef<HTMLUListElement>(null);

    const fontSizes = [
        6, 8, 10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80, 96, 104, 120, 144,
    ];

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(target) &&
            !target.classList.contains("font-size") &&
            !decreaseSizeRef.current?.contains(target) &&
            !increaseSizeRef.current?.contains(target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpen]);

    const handleFontSizeSelect = (size: number) => {
        setFontSize(size);
        setIsOpen(false);
    };

    return (
        <ul className={`font-size-options options${isOpen ? "" : " hide"}`} ref={dropdownRef} onClick={e => e.stopPropagation()}>
            {fontSizes.map(size => (
                <li
                    key={size}
                    className={`big-padding${fontSize === size ? " active" : ""}`}
                    onClick={() => handleFontSizeSelect(size)}
                >
                    {size} px
                </li>
            ))}
        </ul>
    );
};