import { useState, useRef } from 'react';
import { Save, Settings, X, FileText } from 'lucide-react';
import Switch from 'react-switch';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { setField } from '../src/store';

interface DownloadOptionsState {
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

interface TextContent {
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

// Header Component
const ModalHeader = ({ textContent, onClose }: { textContent: TextContent; onClose: () => void }) => (
    <div className="modal-header">
        <div className="modal-header__content">
            <FileText className="modal-header__icon" />
            <h2 className="modal-header__title">{textContent.pdfDownloadOptions}</h2>
        </div>
        <button
            onClick={onClose}
            className="modal-header__close-button"
        >
            <X className="modal-header__close-icon" />
        </button>
    </div>
);

// File Name Section
const FileNameSection = ({ options, updateOptions, textContent }: {
    options: DownloadOptionsState;
    updateOptions: (updates: Partial<DownloadOptionsState>) => void;
    textContent: TextContent;
}) => (
    <div className="form-section">
        <label className="form-section__label">{textContent.fileName}</label>
        <input
            type="text"
            value={options.fileName}
            onChange={(e) => updateOptions({ fileName: e.target.value })}
            placeholder={textContent.fileNamePlaceholder}
            className="form-section__input"
        />
    </div>
);

// Layout and Paper Size Section
const LayoutPaperSection = ({ options, updateOptions, textContent, paperSizeOptions, selectStyles }: {
    options: DownloadOptionsState;
    updateOptions: (updates: Partial<DownloadOptionsState>) => void;
    textContent: TextContent;
    paperSizeOptions: Array<{ value: string; label: string }>;
    selectStyles: any;
}) => (
    <div className="layout-paper-section">
        <div className="layout-controls">
            <label className="form-section__label">{textContent.layout}</label>
            <div className="layout-controls__buttons">
                {(['portrait', 'landscape'] as const).map(layout => (
                    <button
                        key={layout}
                        onClick={() => updateOptions({ layout })}
                        className={`layout-controls__button ${options.layout === layout ? 'layout-controls__button--active' : ''}`}
                    >
                        {textContent[layout]}
                    </button>
                ))}
            </div>
        </div>

        <div className="paper-size-controls">
            <label className="form-section__label">{textContent.paperSize}</label>
            <Select
                value={paperSizeOptions.find(option => option.value === options.paperSize)}
                onChange={(selectedOption) => updateOptions({ paperSize: selectedOption?.value || 'A4' })}
                options={paperSizeOptions}
                styles={selectStyles}
                isSearchable={false}
                className="paper-size-controls__select"
            />
        </div>
    </div>
);

// Scale Section
const ScaleSection = ({ options, updateOptions, textContent }: {
    options: DownloadOptionsState;
    updateOptions: (updates: Partial<DownloadOptionsState>) => void;
    textContent: TextContent;
}) => (
    <div className="scale-section">
        <label className="scale-section__label">
            {textContent.scale}: {options.scale}%
        </label>
        <div className="scale-section__slider-container">
            <input
                type="range"
                min="25"
                max="200"
                value={options.scale}
                onChange={(e) => updateOptions({ scale: parseInt(e.target.value) })}
                className="scale-section__slider"
                style={{
                    background: `linear-gradient(to right, #38ada9 0%, #38ada9 ${(options.scale - 25) / 1.75}%, #e5e7eb ${(options.scale - 25) / 1.75}%, #e5e7eb 100%)`
                }}
            />
            <div className="scale-section__markers">
                <span>25%</span>
                <span>100%</span>
                <span>200%</span>
            </div>
        </div>
    </div>
);

// Margins Section
const MarginsSection = ({ options, updateOptions, updateCustomMargins, textContent, marginOptions }: {
    options: DownloadOptionsState;
    updateOptions: (updates: Partial<DownloadOptionsState>) => void;
    updateCustomMargins: (side: keyof DownloadOptionsState['customMargins'], value: number) => void;
    textContent: TextContent;
    marginOptions: Array<{ value: string; label: string }>;
}) => (
    <div className="margins-section">
        <label className="form-section__label">{textContent.margins}</label>
        <div className="margins-section__options">
            {marginOptions.map(option => (
                <button
                    key={option.value}
                    onClick={() => updateOptions({ margin: option.value as any })}
                    className={`margins-section__option ${options.margin === option.value ? 'margins-section__option--active' : ''}`}
                >
                    {option.label}
                </button>
            ))}
        </div>

        {options.margin === 'custom' && (
            <div className="custom-margins">
                <h4 className="custom-margins__title">{textContent.customMarginsTitle} ({textContent.customMarginsUnit})</h4>
                <div className="custom-margins__controls">
                    {(Object.keys(options.customMargins) as Array<keyof typeof options.customMargins>).map(side => (
                        <div key={side} className="custom-margins__control">
                            <label className="custom-margins__label">{textContent[side]}</label>
                            <input
                                type="number"
                                min="0"
                                max="50"
                                value={options.customMargins[side]}
                                onChange={(e) => updateCustomMargins(side, parseInt(e.target.value) || 0)}
                                className="custom-margins__input"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

// Duplex Section
const DuplexSection = ({ options, updateOptions, textContent }: {
    options: DownloadOptionsState;
    updateOptions: (updates: Partial<DownloadOptionsState>) => void;
    textContent: TextContent;
}) => (
    <div className="duplex-section">
        <div className="duplex-section__content">
            <h4 className="duplex-section__title">{textContent.doubleSided}</h4>
            <p className="duplex-section__description">{textContent.doubleSidedDesc}</p>
        </div>
        <Switch
            checked={options.duplex}
            onChange={(checked) => updateOptions({ duplex: checked })}
            onColor="#38ada9"
            offColor="#d1d5db"
            checkedIcon={false}
            uncheckedIcon={false}
            height={24}
            width={48}
            handleDiameter={20}
        />
    </div>
);

// Modal Body
const ModalBody = ({ options, updateOptions, updateCustomMargins, textContent }: {
    options: DownloadOptionsState;
    updateOptions: (updates: Partial<DownloadOptionsState>) => void;
    updateCustomMargins: (side: keyof DownloadOptionsState['customMargins'], value: number) => void;
    textContent: TextContent;
}) => {
    const paperSizeOptions = [
        { value: 'A4', label: 'A4' },
        { value: 'A3', label: 'A3' },
        { value: 'A5', label: 'A5' },
        { value: 'Letter', label: 'Letter' },
        { value: 'Legal', label: 'Legal' },
        { value: 'Tabloid', label: 'Tabloid' }
    ];

    const marginOptions = [
        { value: 'default', label: textContent.default },
        { value: 'none', label: textContent.none },
        { value: 'minimal', label: textContent.minimal },
        { value: 'custom', label: textContent.custom }
    ];

    const selectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderColor: state.isFocused ? '#38ada9' : '#d1d5db',
            borderWidth: '2px',
            borderRadius: '8px',
            padding: '4px',
            boxShadow: state.isFocused ? '0 0 0 0px #38ada9' : 'none',
            '&:hover': {
                borderColor: '#38ada9'
            }
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#38ada9' : state.isFocused ? '#38ada9' + '20' : 'white',
            color: state.isSelected ? 'white' : '#374151',
            '&:hover': {
                backgroundColor: state.isSelected ? '#38ada9' : '#38ada9' + '20'
            }
        })
    };

    return (
        <div className="modal-body">
            <div className="modal-body__content">
                <FileNameSection options={options} updateOptions={updateOptions} textContent={textContent} />
                <LayoutPaperSection
                    options={options}
                    updateOptions={updateOptions}
                    textContent={textContent}
                    paperSizeOptions={paperSizeOptions}
                    selectStyles={selectStyles}
                />
                <ScaleSection options={options} updateOptions={updateOptions} textContent={textContent} />
                <MarginsSection
                    options={options}
                    updateOptions={updateOptions}
                    updateCustomMargins={updateCustomMargins}
                    textContent={textContent}
                    marginOptions={marginOptions}
                />
                <DuplexSection options={options} updateOptions={updateOptions} textContent={textContent} />
            </div>
        </div>
    );
};

// Modal Footer
const ModalFooter = ({ onCancel, onSave, textContent }: {
    onCancel: () => void;
    onSave: () => void;
    textContent: TextContent;
}) => (
    <div className="modal-footer">
        <button
            onClick={onCancel}
            className="modal-footer__cancel-button"
        >
            {textContent.cancel}
        </button>
        <button
            onClick={onSave}
            className="modal-footer__save-button"
        >
            <Save className="modal-footer__save-icon" />
            {textContent.save}
        </button>
    </div>
);

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
            <div className="floating-action-button">
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

// Example usage with text content
export const defaultTextContent: TextContent = {
    downloadOptions: "Download Options",
    pdfDownloadOptions: "PDF Download Options",
    layout: "Layout",
    portrait: "Portrait",
    landscape: "Landscape",
    paperSize: "Paper Size",
    scale: "Scale",
    margins: "Margins",
    default: "Default",
    none: "None",
    minimal: "Minimal",
    custom: "Custom",
    customMarginsTitle: "Custom Margins",
    customMarginsUnit: "mm",
    top: "Top",
    right: "Right",
    bottom: "Bottom",
    left: "Left",
    doubleSided: "Double-sided printing",
    doubleSidedDesc: "Print on both sides of the page",
    fileName: "File Name",
    fileNamePlaceholder: "Enter file name...",
    cancel: "Cancel",
    save: "Save"
};