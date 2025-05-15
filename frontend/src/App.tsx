import { Route, Switch, useLocation } from "wouter";
import { ProtectedRoute } from "./components/protected-route";
import { Home } from "./routes/home";
import { Login } from "./routes/login";
import { Toaster } from "react-hot-toast";
import { useAutoRenewToken } from "./hooks/use-auto-renew";
import { getIsLoggedInStore, getUserStore, setUserStore } from "./store/user";
import { logout } from "./helpers";

/**
 * TODO:
 *  - Add lazy imports (React.lazy + Suspense) for each route to improve bundle performance,
 *    excluding the login route for faster initial load.
 *
 *  - Implement a register view
 */

function App() {
	const $user = getUserStore();
	const $isLoggedIn = getIsLoggedInStore();
	// eslint-disable-next-line
	const [_, navigate] = useLocation();

	useAutoRenewToken($user, setUserStore, navigate);
	return (
		<>
			<Toaster
				toastOptions={{
					style: {
						textAlign: "center",
						backgroundColor: "#161b22",
						color: "#f0f6fc",
					},
				}}
			/>
			<main>
				{$isLoggedIn && (
					<nav>
						<button
							onClick={() => logout($user.token, navigate)}
							className="logout">
							Cerrar Sesión
						</button>
					</nav>
				)}
				<Switch>
					<Route path="/">
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					</Route>
					<Route
						path="/login"
						component={Login}
					/>
				</Switch>
			</main>
		</>
	);
}

export default App;
