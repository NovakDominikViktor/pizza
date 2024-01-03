import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";

export function PizzaDeletePage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
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
                <div>
                    <h2>Pizza törlése</h2>
                    <div className='card p-3'>
                        <div className='card-body'>
                            <h5 className='card-title'>{pizza.name}</h5>
                            <div className='lead'>Gluténmentes: {pizza.isGlutenFree ? 'Igen' : 'Nem'}</div>
                            <img className='img-fluid rounded'
                                style={{ maxHeight: "500px" }}
                                alt="hiányzik a képed innen!"
                                src={pizza.kepURL ? pizza.kepURL : "https://via.placeholder.com/400x800"}
                            />
                        </div>
                        <form onSubmit={async (e) => {
                            try {
                                e.preventDefault();
                                await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                                    method: "DELETE",
                                });
                                navigate("/");
                            } catch (error) {
                                console.log(error);
                            }
                        }}>
                            <div>
                                <NavLink to={"/"}>
                                    <button className="bi bi-backspace btn btn-warning rounded">Mégsem</button>
                                </NavLink>
                                <button className="bi bi-trash3 btn btn-danger rounded">Törlés</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
