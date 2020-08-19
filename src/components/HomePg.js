import React from 'react';
import {Button} from 'reactstrap';
import{Link} from 'react-router-dom';



const HomePg = () => {
    return(
        <div>
            <img src="https://cdn.pixabay.com/photo/2013/07/13/09/36/pizza-155771_960_720.png" alt="image of pizza"/><br/>
            
            <Link to="/form">
                <Button>Buy a pizza?</Button>
            </Link>
            
        </div>
    )
}

export default HomePg;