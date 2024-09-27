import { Outlet, ScrollRestoration, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="flex flex-col bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
				<div className="pb-8"><Navbar /></div>
				<div className="flex-grow">
					<ScrollRestoration />
					<Outlet />
				</div>
                <Footer />
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
