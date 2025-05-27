import { useSelector } from "react-redux";
import { type ToolState } from "../src/store";
import EfficientCombinationIcon from "./icons/EfficientCombinationIcon";
import AIIcon from "./icons/AIIcon";
import AllInOneIcon from "./icons/AllInOneIcon";

export const Features = ({ features }: {
    features: { title: string; description: string }[];
}) => {
    const stateShowTool = useSelector(
        (state: { tool: ToolState }) => state.tool.showTool
    );
    const icons = [AIIcon, EfficientCombinationIcon, AllInOneIcon]
    return (
        <div className={`features${stateShowTool ? "" : " d-none"}`}>
            {features.map(({ title, description }, i) => {
                const Icon = icons[i];
                return (
                    <div className="feature" key={`index-${i}`}>
                        <Icon className={`feature-icon${i === 0 ? " no-fill" : ""}`} />
                        <div className="title">{title}</div>
                        <p className="description">{description}</p>
                    </div>
                )
            })}
        </div>
    )
}