import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItem from '../Navigationitems/NavigationItem/NavigationItem';

const sideDrawer = () => {
    return (
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItem>BurgerBuilder</NavigationItem>
                <NavigationItem>Checkout</NavigationItem>
            </nav>
        </div>
    );
}
export default sideDrawer;