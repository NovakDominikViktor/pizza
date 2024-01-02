import { useNavigate } from 'react-router-dom';

export function PizzaCreatePage() {
  const navigate = useNavigate();

  return (
    <div className='p-5 content bg-whitesmoke text-center'>
      <h2>Új pizza</h2>
      <form
        onSubmit={(e) => {
          e.persist();
          e.preventDefault();
          fetch("https://pizza.kando-dev.eu/Pizza", {
            method: "POST",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: e.target.elements.name.value,
              isGlutenFree: e.target.elements.isGlutenFree.checked,
              imageURL: e.target.elements.imageURL.value,
              // Add other pizza-specific properties here based on your data structure
            }),
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className='form-group row pb-3'>
          <label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
          <div>
            <input type="text" id="name" name="name" className="form-control" autoComplete='name' />
          </div>
        </div>
        {/* Add other input fields for pizza properties (e.g., price, quantity) here */}
        <div className='form-group row pb-3'>
          <label htmlFor="isGlutenFree" className='col-sm-3 col-form-label'> Gluténmentes: </label>
          <div>
            <input type="checkbox" id="isGlutenFree" name="isGlutenFree" />
          </div>
        </div>
        <div className='form-group row pb-3'>
          <label htmlFor="imageURL" className='col-sm-3 col-form-label'> Kép URL: </label>
          <div>
            <input type="text" id="imageURL" name="imageURL" className="form-control" autoComplete='imageURL' />
          </div>
        </div>
        <button type="submit" className='btn btn-success'>Küldés</button>
      </form>
    </div>
  );
}
