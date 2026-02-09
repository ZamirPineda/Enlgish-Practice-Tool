import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        katex: any;
    }
}

interface LatexRendererProps {
    formula: string;
    className?: string;
    block?: boolean;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ formula, className = "", block = false }) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (containerRef.current && window.katex) {
            try {
                window.katex.render(formula, containerRef.current, {
                    throwOnError: false,
                    displayMode: block
                });
            } catch (error) {
                console.error("KaTeX rendering error:", error);
                containerRef.current.innerText = formula;
            }
        }
    }, [formula, block]);

    return <span ref={containerRef} className={`${className} font-serif`} />;
};

export default LatexRenderer;
