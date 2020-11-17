import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state ={
        showSideDrawer: true
    }
    sideDrawerCloseHandler =()=>{
        this.setState({showSideDrawer: false})
    }

    render(){
        return (
            <Aux>
                <Toolbar />
                <SideDrawer 
                open={this.state.showSideDrawer} 
                click = {this.sideDrawerCloseHandler} />
                <main className = {classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;