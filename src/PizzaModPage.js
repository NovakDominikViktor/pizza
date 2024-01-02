import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function PizzaModPage() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.pizzaId;

  const [, setPizza] = useState([]);
  const [modName, setModName] = useState("");
  const [modIsGlutenFree, setModIsGlutenFree] = useState(false);
  const [modImageURL, setModImageURL] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`);
        const pizzaData = await res.json();
        setPizza(pizzaData);
        setModName(pizzaData.name);
        setModIsGlutenFree(pizzaData.isGlutenFree);
        setModImageURL(pizzaData.kepURL);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleNameChange = (e) => {
    setModName(e.target.value);
  };

  const handleIsGlutenFreeChange = () => {
    setModIsGlutenFree(!modIsGlutenFree);
  };

  const handleImageURLChange = (e) => {
    setModImageURL(e.target.value);
  };

  return (
    <div className="p-5 content bg-lavender text-center">
      <h2>Pizza módosítás</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
              name: modName,
              isGlutenFree: modIsGlutenFree ? 1 : 0,
              kepURL: modImageURL,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <div>
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Név:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={modName}
              onChange={handleNameChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <div>
            <label htmlFor="isGlutenFree" className="col-sm-3 col-form-label">
              Gluténmentes:
            </label>
            <input
              type="checkbox"
              id="isGlutenFree"
              name="isGlutenFree"
              checked={modIsGlutenFree}
              onChange={handleIsGlutenFreeChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <div>
            <label htmlFor="imageURL" className="col-sm-3 col-form-label">
              Kép URL:
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              className="form-control"
              value={modImageURL}
              onChange={handleImageURLChange}
              autoComplete="off"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
