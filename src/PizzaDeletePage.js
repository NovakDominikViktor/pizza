import { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export function PizzaDeletePage() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.pizzaId;

  const [pizza, setPizza] = useState({});
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch(`https://pizza.kando-dev.eu/Pizza/${id}`)
      .then((res) => res.json())
      .then((pizzaData) => setPizza(pizzaData))
      .catch(console.log)
      .finally(() => {
        setPending(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-5 m-auto text-center content bg-lavender'>
      {isPending || !pizza.id ? (
        <div className='spinner-border'></div>
      ) : (
        <div className='card p-3'>
          <div className='card-body'>
            <h4>{pizza.name}</h4>
            {/* Display other pizza-specific details */}
            <form onSubmit={handleDelete}>
              <div>
                <NavLink to={"/"}>
                  <button className='bi bi-backspace btn btn-warning rounded'>Mégsem</button>
                </NavLink>
                <button className='bi bi-trash3 btn btn-danger rounded'>Törlés</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
