import NavLoggedIn from "../NavLoggedIn/NavLoggedIn";
import NavLoggedOut from "../NavLoggedOut/NavLoggedOut";
import "./Nav.css";

function Nav({ handleLoginClick, isInverse, isLoggedIn, handleLogout }) {
  return (
    <nav className="nav" data-theme={isInverse ? "light" : "dark"}>
      <p className="nav_logo">NewsExplorer</p>
      {!isLoggedIn ? (
        <NavLoggedOut handleLoginClick={handleLoginClick} />
      ) : (
        <NavLoggedIn isInverse={isInverse} handleLogout={handleLogout} />
      )}
    </nav>
  );
}

export default Nav;

// later refactor into split components:
// Nav-Logged-in and Nav-Logged-Out

// add highlight bar (focus), how do I do that??

// change links to list items

// function Nav({ isLoggedIn, handleLoginClick, handleLogout }) {
//   return (
//     <>
//       {isLoggedIn ? (
//         <NavLoggedIn handleLogout={handleLogout} />
//       ) : (
//         <NavLoggedOut handleLoginClick={handleLoginClick} />
//       )}
//     </>
//   );
// }
