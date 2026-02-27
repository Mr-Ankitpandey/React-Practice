import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <ul className="list-items">
      <li>
        <NavLink to="state" className={({isActive}) => isActive ? 'active': undefined}>State</NavLink>
      </li>
      <li>
        <NavLink to="context" className={({isActive}) => isActive ? 'active': undefined}>Context</NavLink>
      </li>
      <li>
        <NavLink to="rtk" className={({isActive})=> isActive ? 'active': undefined}>Redux Toolkit</NavLink>
      </li>
    </ul>
  );
};

export default MainNavigation;
