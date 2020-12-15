import React from 'react';
import classes from './NavigationItem.module.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const navigationItem = (props) =>{
    let abc = null;
    if(props.location.pathname===props.link){
        abc = classes.active;
    }
    
    const a = props.link;
    console.log(props.link);
    return(
        <li className={classes.NavigationItem}>
           <Link className={abc} to={a}>
               {props.children}
           </Link>
       </li>
   );}
    
export default withRouter(navigationItem);


