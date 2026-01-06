import { ASSETS } from "@/constants";
import type { BackgroundPatternProps } from "@/types";

/**
 * Reusable background pattern component
 * Used across sections to provide consistent visual styling
 */
const BackgroundPattern = ({
    opacity = 30,
    className = ""
}: BackgroundPatternProps) => {
    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `url(${ASSETS.backgrounds.pattern})`,
                backgroundRepeat: "repeat",
                backgroundSize: "400px",
                opacity: opacity / 100,
            }}
        />
    );
};

export default BackgroundPattern;
