import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const ViewPage = () => {
  const [items, setItems] = useState({});
  const fetch = async () => {
    const response = await axios.get("http://localhost:3000/data");
    setItems(response.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  console.log(items);
  return (
    <>
      <table className="table table-auto border border-collapse">
        <thead className="gap-2">
          <tr>
            <th className="m-2">name </th>
            <th className="m-2"> score </th>
            <th className="m-2">emotion</th>
          </tr>
        </thead>
        <tbody>
          {items?.data
            ? items?.data?.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.score}</td>
                    <td>{e.emotion}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <NavLink to={"/"}>
        <button>back to Login</button>
      </NavLink>
    </>
  );
};
