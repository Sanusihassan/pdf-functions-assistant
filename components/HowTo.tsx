import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type ToolState } from '../src/store';
import type { WithContext, HowTo as HowToType } from 'schema-dts';

const HowTo = ({ howTo, alt, imgSrc }: {
    howTo: WithContext<HowToType>, alt: string;
    imgSrc: string
}) => {
    const stateShowTool = useSelector(
        (state: { tool: ToolState }) => state.tool.showTool
    );
    useEffect(() => {
    }, [stateShowTool])
    return (
        <>
            <div className={`how-to row align-items-center py-3${stateShowTool ? "" : " d-none"}`}>
                <div className="col-12 col-md-6 text-center image">
                    <picture>
                        <source srcSet={`/images/${imgSrc}-xs.png`} media="(max-width: 575px)" />
                        <source srcSet={`/images/${imgSrc}-md.png`} media="(min-width: 575px) and (max-width: 1200px)" />
                        <source srcSet={`/images/${imgSrc}-xl.png`} media="(min-width: 1200px)" />
                        <img src={`/pdfequips.png`} className="img-fluid" alt={alt} title={alt} />
                    </picture>

                </div>
                <div className="col how-to-steps">
                    <div itemScope itemType="http://schema.org/HowTo">
                        {/* @ts-ignore */}
                        <h2 itemProp="name">{howTo.name}</h2>
                        {/* @ts-ignore */}
                        <p itemProp="description">{howTo.description}</p>
                        <ol itemScope itemType="http://schema.org/HowToStep">
                            {/* @ts-ignore */}
                            {howTo.step.map((step, index) => (
                                <li key={index}>
                                    {index === 0 ?
                                        <h3 itemProp="name">{step.name}</h3> : index === 1 ? <h4 className="h3" itemProp="name">{step.name}</h4> : index == 2 ? <h6 className="h3" itemProp="name">{step.name}</h6> : <div className="h3" itemProp="name">{step.name}</div>}
                                    <p itemProp="text">{step.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>

                </div>
            </div>
        </>
    );
};

export default HowTo;