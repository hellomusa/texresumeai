import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="min-h-screen">
				<Navbar />
				<Outlet />
                <Footer />
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
