
import { Download, Check, Loader } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface FloatingDownloadBtnContent {
    downloading: string;
    complete: string;
    default: string;
}

interface FloatingDownloadBtnProps {
    onClick: (setIsloading: Dispatch<SetStateAction<boolean>>) => Promise<void>;
    content: FloatingDownloadBtnContent;
}

export const FloatingDownloadBtn: React.FC<FloatingDownloadBtnProps> = ({ onClick, content }) => {
    const [isLoading, setIsloading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleClick = async () => {
        if (isLoading || isComplete) return;

        setIsloading(true);
        setIsComplete(false);

        try {
            await onClick(setIsloading);
            setIsComplete(true);
            setTimeout(() => {
                setIsComplete(false);
            }, 2000);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsloading(false);
        }
    };

    const getIcon = () => {
        if (isLoading) {
            return <Loader className="floating-action-button__icon animate-spin" size={28} />;
        }
        if (isComplete) {
            return <Check className="floating-action-button__icon" size={28} />;
        }
        return <Download className="floating-action-button__icon" size={28} />;
    };

    const getButtonClass = () => {
        let baseClass = "floating-action-button__button";
        if (isLoading) baseClass += " loading";
        if (isComplete) baseClass += " complete";
        return baseClass;
    };

    const ariaLabel = isLoading ? content.downloading : isComplete ? content.complete : content.default;

    return (
        <div className="floating-action-button right download">
            <button
                type="button"
                className={getButtonClass()}
                aria-label={ariaLabel}
                onClick={handleClick}
                disabled={isLoading}
            >
                {getIcon()}
            </button>
        </div>
    );
};
