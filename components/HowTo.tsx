import React from 'react';
import { useSelector } from 'react-redux';
import type { WithContext, HowTo as HowToType } from 'schema-dts';
import type { ToolState } from '../src/store';

interface HowToProps {
    howTo: WithContext<HowToType>;
    alt: string;
    imgSrc: string;
}

const HowTo: React.FC<HowToProps> = ({ howTo, alt, imgSrc }) => {
    const stateShowTool = useSelector(
        (state: { tool: ToolState }) => state.tool.showTool
    );

    const imageSourceSets = {
        xs: `/images/${imgSrc}-xs.png`,
        md: `/images/${imgSrc}-md.png`,
        xl: `/images/${imgSrc}-xl.png`,
    };

    // Custom hook to handle image loading state
    const useImageLoading = () => {
        const [isLoaded, setIsLoaded] = React.useState(false);
        const imageRef = React.useRef<HTMLImageElement>(null);

        React.useEffect(() => {
            if (imageRef.current?.complete) {
                setIsLoaded(true);
            }
        }, []);

        return { isLoaded, imageRef, setIsLoaded };
    };

    const { isLoaded, imageRef, setIsLoaded } = useImageLoading();

    const getStepHeading = (index: number, name: string) => {
        const commonProps = {
            itemProp: "name",
            className: index > 0 ? "h3" : undefined
        };

        switch (index) {
            case 0:
                return <h3 {...commonProps}>{name}</h3>;
            case 1:
                return <h4 {...commonProps}>{name}</h4>;
            case 2:
                return <h6 {...commonProps}>{name}</h6>;
            default:
                return <div {...commonProps}>{name}</div>;
        }
    };

    return (
        <div
            className={`how-to row align-items-center py-3${stateShowTool ? "" : " d-none"}`}
            suppressHydrationWarning
        >
            <div className="col-12 col-md-6 text-center image">
                <div
                    style={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        transition: 'opacity 0.3s ease',
                        opacity: isLoaded ? 1 : 0.5
                    }}
                >
                    <picture>
                        <source srcSet={imageSourceSets.xs} media="(max-width: 575px)" />
                        <source srcSet={imageSourceSets.md} media="(min-width: 575px) and (max-width: 1200px)" />
                        <source srcSet={imageSourceSets.xl} media="(min-width: 1200px)" />
                        <img
                            ref={imageRef}
                            src="/pdfequips.png"
                            className="img-fluid"
                            alt={alt}
                            title={alt}
                            loading="lazy"
                            style={{
                                minHeight: '200px',
                                objectFit: 'contain'
                            }}
                            onLoad={() => setIsLoaded(true)}
                        />
                    </picture>
                </div>
            </div>

            <div className="col how-to-steps">
                <article
                    itemScope
                    itemType="http://schema.org/HowTo"
                    className="how-to-content"
                >
                    <header>
                        {/* @ts-ignore */}
                        <h2 itemProp="name">{howTo.name}</h2>
                        {/* @ts-ignore */}
                        <p itemProp="description">{howTo.description}</p>
                    </header>

                    <ol
                        itemScope
                        itemType="http://schema.org/HowToStep"
                        className="steps-list"
                    >
                        {(howTo.step as unknown as Array<{ name: string; text: string }>).map((step: { name: string; text: string }, index: number) => (
                            <li key={index} className="step-item">
                                {getStepHeading(index, step.name)}
                                <p itemProp="text">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </article>
            </div>
        </div>
    );
};

export default HowTo;