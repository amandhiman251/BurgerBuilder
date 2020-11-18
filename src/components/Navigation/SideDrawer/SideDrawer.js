import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItem from '../Navigationitems/NavigationItem/NavigationItem';
import Aux from '../../../hoc/AUX/Aux';
import BackDrop from '../../UI/BackDrop/BackDrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked ={props.click}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItem>BurgerBuilder</NavigationItem>
                    <NavigationItem>Checkout</NavigationItem>
                </nav>
            </div>
        </Aux>
    );
}
export default sideDrawer;