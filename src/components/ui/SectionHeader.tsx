import { motion } from "framer-motion";
import type { SectionHeaderProps } from "@/types";

/**
 * Reusable section header component with consistent styling
 * Used across all major sections of the wedding site
 */
const SectionHeader = ({
    subtitle,
    title,
    showDivider = true,
    badge,
    className = "",
}: SectionHeaderProps) => {
    return (
        <div className={`text-center mb-16 ${className}`}>
            <p className="font-heading text-accent uppercase tracking-[0.3em] text-xs mb-4">
                {subtitle}
            </p>
            <h2 className="font-script text-4xl md:text-6xl text-primary">
                {title}
            </h2>
            {showDivider && (
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-6" />
            )}
            {badge && (
                <div className="inline-flex items-center gap-2 mt-6 bg-primary/10 text-primary px-5 py-2 rounded-full">
                    {badge.icon}
                    <p className="font-body text-sm">{badge.text}</p>
                </div>
            )}
        </div>
    );
};

/**
 * Animated version of SectionHeader with fade-in effect
 */
export const AnimatedSectionHeader = ({
    isInView,
    ...props
}: SectionHeaderProps & { isInView: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
            <SectionHeader {...props} />
        </motion.div>
    );
};

export default SectionHeader;
