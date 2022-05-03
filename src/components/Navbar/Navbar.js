import "./navbar.css";

const ALFlag = {
	src: "/assets/aimlab_flag.svg",
	alt: "Aim Lab",
};

const Navbar = () => {
	return (
		<nav className="main_nav">
			<a href="www.google.com" className="main_nav_logo">
				<img src={process.env.PUBLIC_URL + ALFlag.src} alt={ALFlag.alt} />
			</a>
			<div className="nav_buttons">
				<a href="www.google.com">
					<button>Download Aim Lab</button>
				</a>
				<a href="www.google.com">
					<button>Download Aim Lab VR</button>
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
