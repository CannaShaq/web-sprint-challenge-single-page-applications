import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required for order. "),
    sizeChoice: yup.string().required("You must choose a size. "),
    sauce: yup.boolean().oneOf([true], "Please pick a sauce"),
    toppings: yup.boolean().oneOf([true], "Please choose your toppings"),
    specialInstructions: yup.string().optional("You may enter any special request")

});

//const Form = () => {
export default function Form() {


    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formDat, setFormDat] = useState({
        name: "",
        sizeChoice: "",
        sauce: false,
        toppings: false,
        specialInstructions: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        sizeChoice: "",
        sauce: false,
        toppings: false,
        specialInstructions: ""
    });

    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formDat).then(valid => {
            console.log("Form Valid? ", valid);
            setButtonDisabled(!valid);
        })
    }, [formDat])



    const inputChange = e => {
        e.persist();
        const newFormDat = {
            ...formDat,
            [e.target.name]:
                e.target.type === "checkbox" || e.target.type==="radio" ? e.target.checked : e.target.value
        };
        
        validateChange(e);
        setFormDat(newFormDat);
    }

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formDat)
            .then(res => {
                setPost(res.data);

                console.log("Success: ", post);

                setFormDat({
                    name: "",
                    sizeChoice: "",
                    sauce: false,
                    toppings: false,
                    specialInstructions: "",
                })
            })
            .catch(err=> console.log("formSubmit() err: ", err.response));
    }

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.name === "sauce" || e.target.name === "toppings" ? e.target.checked : e.target.value)
            .then(valid => {
                setErrors({
                    ...errors, 
                    [e.target.name]: ""
                })
            })
            .catch(err => {
                setErrors({
                    ...errors, 
                    [e.target.name]: err.errors[0]
                })
            })
    }

    /* syntax error: extra parenthesis, did the parenthesis remove fn from scope? (question to myself)
    const validateChange = e => ({
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.name === "sauce" || e.target.name === "toppings" ? e.target.checked : e.target.value)
            .then(valid => {
                setErrors({
                    ...errors, [e.target.name]: errors.errors[0]
                })
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                })
            })

    }); */



    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                <br/>
                Name: <br/>
                <input type="text" name="name" value={formDat.name} onChange={inputChange}/>
                <br/>
                <br/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="sizeChoice">
                Choice of Size?
                <br/>
                <select id="sizeChoice" name="sizeChoice" value={formDat.sizeChoice} onChange={inputChange}>
                    <option>--Please Choose a size--</option>
                    <option value="SMALL">SMALL</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LARGE">LARGE</option>
                    <option value="xTRA-LARGE">xTRA-LARGE</option>
                </select>
                {errors.sizeChoice.length > 0 ? <p className="error">{errors.sizeChoice}</p> : null}
            </label>
            <label htmlFor="sauce">
                <br/>
                <br/>
                What kind of sauce?
                <br/>
                <input id="marinara" value={formDat.sauce} onChange={inputChange} type="checkbox" name="sauce"/>Marinara
                <input id="garlic" value={formDat.sauce} onChange={inputChange} type="checkbox" name="sauce"/>Buttery Garlic
                {errors.sauce.length > 0 ? <p className="error">{errors.sauce}</p> : null}
            </label>
            <label htmlFor="toppings">
                <br/>
                <br/>
                Choose your toppings (4max)
                <br/>
                <input id="pepperoni" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Pepperoni<br/>
                <input id="sausage" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Sausage<br/>
                <input id="chicken" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Chicken<br/>
                <input id="cBacon" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Candian Bacon<br/>
                <input id="mushroom" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Mushroom<br/>
                <input id="onion" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Onion<br/>
                <input id="greenPepper" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Green Pepper<br/>
                <input id="tomato" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Tomatoes<br/>
                <input id="olives" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Olives<br/>
                <input id="aHearts" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Artichoke Hearts<br/>
                <input id="pineapple" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>Pineapple<br/>
                <input id="xCheese" value={formDat.toppings} onChange={inputChange} type="checkbox" name="toppings"/>xTra Cheese<br/>
                {errors.toppings.length > 0 ? <p className="error">{errors.toppings}</p> : null}
            </label>
            <label htmlFor="specialInstructions">
                <br/>
                <br/>
                Special Instructions?
                <br/>
                <textarea id="specialInstructions" name="specialInstructions" value={formDat.specialInstructions} onChange={inputChange}/>
                <br/>
                {errors.specialInstructions.length > 0 ? <p className="error">{errors.specialInstructions}</p> : null}
            </label>
            <br/>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button type="submit" disabled={buttonDisabled}>Finish Order</button>
        </form>
    )
}

/* const inputChange = e => {
    const newFormDat = {
        ...formDat,
        [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    setFormDat(newFormDat);
}

const formSubmit = () =>{

} */


