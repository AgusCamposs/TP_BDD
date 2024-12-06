import { Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import styles from "./Root.module.css"

const RootLayout = () => {
	return (
		<>
			<header className={styles.header}>
				<nav>
					<ul className={styles.nav}>
						<li className={styles["nav-item"]}>
							<Link
								to="/movies"
								activeOptions={{ exact: true }}
								activeProps={{ className: styles.active }}>
								Movies
							</Link>
						</li>
						<li className={styles["nav-item"]}>
							<Link to="/movies/create" activeProps={{ className: styles.active }}>
								Create Movie
							</Link>
						</li>
						<li className={styles["nav-item"]}>
							<Link to="/reviews/create" activeProps={{ className: styles.active }}>
								Create Review
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Outlet />
			<TanStackRouterDevtools initialIsOpen={false} />
		</>
	)
}

export default RootLayout
