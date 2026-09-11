import re

with open("src/components/MathFlashCard.tsx", "r") as f:
    content = f.read()

# Add useCallback to functions that will be used in useEffect
content = content.replace('import React, { useState, useEffect } from "react";', 'import React, { useState, useEffect, useCallback } from "react";')

content = content.replace(
    'const handleNext = () => {',
    'const handleNext = useCallback(() => {'
)
content = content.replace(
    '  };',
    '  }, [randomizedRows.length]);'
).replace(
    'const handlePrev = () => {',
    'const handlePrev = useCallback(() => {'
).replace(
    'const handleFlip = () => {',
    'const handleFlip = useCallback(() => {'
).replace(
    '  };',
    '  }, [isFlipped]);'
)

print("Check manually before creating plan")
