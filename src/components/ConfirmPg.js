import React from 'react';

const ConfirmPg = (props) => {
    return(
        <div>
            Name: {props.name}<br/>
            <hr/>
            Size: {props.size}<br/>
            Sauce: {props.sauce.value}<br/>
            Toppings: {props.toppings}<br/>
            Special Instructions: {props.specInstruct}<br/>
            {/*Order Number: {props.res.data.id}*/}
            

        </div>
    )
}

export default ConfirmPg;