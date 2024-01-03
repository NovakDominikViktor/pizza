import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";

export function PizzaSinglePage() {
    const param = useParams();
    const id = param.id; 
    const [pizza, setPizza] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`);
                const pizzaData = await res.json();
                setPizza(pizzaData);
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !pizza.id ? (<div className='spinner-border'></div>) : (
                <div className='card p-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>{pizza.name}</h5>
                        <div className='lead'>Gluténmentes: {pizza.isGlutenFree ? 'Igen' : 'Nem'}</div>
                        <NavLink to={"/"}>
                            <img className='img-fluid rounded'
                                style={{ maxHeight: "500px" }}
                                alt="hiányzik a képed innen!"
                                src={pizza.kepURL ? pizza.kepURL : "https://via.placeholder.com/400x800"}
                            />
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}
