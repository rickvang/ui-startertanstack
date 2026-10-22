import type { ReactNode } from "react";
import { createContext, useContext } from "react";

export type Density = "dense" | "standard" | "wide";

const DensityContext = createContext<Density>("standard");

export function DensityProvider({ density, children }: { density: Density; children: ReactNode }) {
    return <DensityContext.Provider value={density}>{children}</DensityContext.Provider>;
}

export function useDensity(override?: Density) {
    const context = useContext(DensityContext);
    return override ?? context;
}
