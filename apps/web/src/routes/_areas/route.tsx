import { Outlet, createFileRoute } from "@tanstack/react-router";
import { areas } from "../../areas";

export const Route = createFileRoute("/_areas")({
    beforeLoad: () => ({ areas }),
    component: AreaFrame,
});

function AreaFrame() {
    return <Outlet />;
}
