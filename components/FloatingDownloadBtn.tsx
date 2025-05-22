import { Download } from 'lucide-react';
interface FloatingDownloadBtnProps {
    onClick: () => void;
}

export const FloatingDownloadBtn: React.FC<FloatingDownloadBtnProps> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="floating-download-btn"
            aria-label="Download"
            onClick={onClick}
        >
            <Download size={28} />
        </button>
    );
};