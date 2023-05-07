import React, {createContext} from "react";

type ColorContextValue = {
    primaryColor: string;
    selectColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextValue>({
    primaryColor: "blue",
    selectColor: () => {
    },
});

export function ColorProvider({children, color, setColor}: {
    children: React.ReactNode,
    color: string,
    setColor: (color: string) => void
}) {
    function selectColor(color: string) {
        setColor(color);
    }

    const contextValue: ColorContextValue = {
        primaryColor: color,
        selectColor,
    };

    return (
        <ColorContext.Provider value={contextValue}>
            {children}
        </ColorContext.Provider>
    );
}

export function useColor() {
    const context = React.useContext(ColorContext);
    if (!context) {
        throw new Error(
            "useColor must be used within a ColorProvider. " +
            "Wrap a parent component in <ColorProvider> to fix this error."
        );
    }
    return context;
}
