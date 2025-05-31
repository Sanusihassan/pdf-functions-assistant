import { useState, useRef } from 'react';
import { Settings } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { setField } from '../src/store';
import { ModalBody, ModalFooter, ModalHeader } from './DownloadOptionComponents';

export interface DownloadOptionsState {
    layout: 'portrait' | 'landscape';
    paperSize: string;
    scale: number;
    margin: 'default' | 'none' | 'minimal' | 'custom';
    customMargins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    duplex: boolean;
    fileName: string;
}

export interface TextContent {
    downloadOptions: string;
    pdfDownloadOptions: string;
    layout: string;
    portrait: string;
    landscape: string;
    paperSize: string;
    scale: string;
    margins: string;
    default: string;
    none: string;
    minimal: string;
    custom: string;
    customMarginsTitle: string;
    customMarginsUnit: string;
    top: string;
    right: string;
    bottom: string;
    left: string;
    doubleSided: string;
    doubleSidedDesc: string;
    fileName: string;
    fileNamePlaceholder: string;
    cancel: string;
    save: string;
}


// Main Component
export const PdfDownloadOptions = ({ textContent }: { textContent: TextContent }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<DownloadOptionsState>({
        layout: 'portrait',
        paperSize: 'A4',
        scale: 100,
        margin: 'default',
        customMargins: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        duplex: false,
        fileName: 'document.pdf'
    });
    const modalRef = useRef<HTMLDivElement>(null);

    const updateOptions = (updates: Partial<DownloadOptionsState>) => {
        setOptions(prev => ({ ...prev, ...updates }));
    };

    const updateCustomMargins = (side: keyof DownloadOptionsState['customMargins'], value: number) => {
        setOptions(prev => ({
            ...prev,
            customMargins: {
                ...prev.customMargins,
                [side]: value
            }
        }));
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    const handleSave = () => {
        dispatch(setField({ downloadOptions: options }));
        setIsOpen(false);
    };

    return (
        <div className="model-wrapper">
            {/* Floating Action Button */}
            <div className="floating-action-button left">
                <button
                    data-tooltip-id="download-tooltip"
                    data-tooltip-content={textContent.downloadOptions}
                    onClick={() => setIsOpen(true)}
                    className="floating-action-button__button"
                >
                    <Settings className="floating-action-button__icon" />
                </button>
                <Tooltip id="download-tooltip" place="top" />
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="modal-overlay"
                    id="settings-modal"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={modalRef}
                        className="modal-container"
                    >
                        <ModalHeader textContent={textContent} onClose={() => setIsOpen(false)} />
                        <ModalBody
                            options={options}
                            updateOptions={updateOptions}
                            updateCustomMargins={updateCustomMargins}
                            textContent={textContent}
                        />
                        <ModalFooter
                            onCancel={() => setIsOpen(false)}
                            onSave={handleSave}
                            textContent={textContent}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};