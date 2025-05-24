import ImageWithLoader from "./ImageWithLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { imageUrlsType } from "./FileCard";
import type { ToolState } from "../../src/store";

type props = {
    imageUrls: imageUrlsType;
    loader_text: string;
};
const arrangementToClassName = (arrangement: "1x1" | "2x1" | "3x1" | "4x1" | "1x2" | "1x3" | "1x4" | "2x2" | "3x2" | "4x2" | "3x3" | "4x4") => {
    const mapping = {
        '1x1': 'single-1x1',
        '2x1': 'horizontal-2x1',
        '3x1': 'horizontal-3x1',
        '4x1': 'horizontal-4x1',
        '1x2': 'vertical-1x2',
        '1x3': 'vertical-1x3',
        '1x4': 'vertical-1x4',
        '2x2': 'grid-2x2',
        '3x2': 'grid-3x2',
        '4x2': 'grid-4x2',
        '3x3': 'grid-3x3',
        '4x4': 'grid-4x4',
    };

    return mapping[arrangement] || '';
};


export const Pages = ({ imageUrls, loader_text }: props) => {
    const dispatch = useDispatch();
    const pageCount = useSelector((state: { tool: ToolState }) => state.tool.pageCount);
    // const { files } = useFileStore();
    // const fileNameParts = files[0].name.split('.');
    // const extension = fileNameParts.length > 1
    //     ? `.${fileNameParts.pop()?.toLowerCase()}`
    //     : '';
    // const arrangement = extension !== ".pdf" ? "4x1" : "3x3";

    const arrangementClass = arrangementToClassName(pageCount >= 10 ? "3x3" : "2x2");

    useEffect(() => {
    }, [imageUrls, dispatch]);

    return (
        <div className={`pages ${arrangementClass}`} style={{ overflowX: "hidden" }}>
            {imageUrls.map((imageUrl, index) => (
                <div key={index.toString()} className="page">
                    <ImageWithLoader
                        imageUrl={imageUrl.url}
                        loader_text={loader_text}
                    />
                </div>
            ))}
        </div>
    );
};
