import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import clsx from 'clsx';


const Navigation = () => {
     const setActiveClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };

    return (
        <nav className={s.navigation}>
            <NavLink className={setActiveClass} to='/'>
                Dashboard
            </NavLink>
            <NavLink className={setActiveClass} to=''>
                Callback
            </NavLink>
        </nav>
    );
};

export default Navigation;