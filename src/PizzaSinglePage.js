import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function PizzaSinglePage() {
  const param = useParams();
  const id = param.pizzaId;
  const [pizza, setPizza] = useState([]);
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

  return (
    <div className='p-5 m-auto text-center content bg-lavender'>
      {isPending || !pizza.id ? (
        <div className='spinner-border'></div>
      ) : (
        <div className='card p-3'>
          <div className='card-body'>
            <h4>{pizza.name}</h4>
            <div> Glutén mentes: {pizza.isGlutenFree ? "nem" : "igen"}</div>
            <img
              className='img-fluid rounded'
              style={{ maxHeight: '500px' }}
              alt='Pizza Image'
              src={pizza.kepURL}
            />
          </div>
        </div>
      )}
    </div>
  );
}
