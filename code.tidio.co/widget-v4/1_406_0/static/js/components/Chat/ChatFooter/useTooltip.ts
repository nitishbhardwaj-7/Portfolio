import { useEffect, useState } from 'react';

const useTooltip = (): {
    isClicked: boolean;
    handleClick: () => void;
    handleMouseEnter: () => void;
} => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (): void => {
        setIsClicked(true);
    };

    const handleMouseEnter = (): void => {
        setIsClicked(false);
    };

    const resetClicked = (): void => {
        setIsClicked(false);
    };

    useEffect(() => {
        document.addEventListener('mouseleave', resetClicked);
        return (): void => {
            document.removeEventListener('mouseleave', resetClicked);
        };
    }, []);

    return {
        isClicked,
        handleClick,
        handleMouseEnter,
    };
};

export default useTooltip;
