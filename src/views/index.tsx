import * as React from "react";
interface Props {
  tables: [];
  attributeName: string;
}

const Index = (props: Props) => {
  return (
    <>
      <link rel="stylesheet" href="css/bootstrap.css" />
      <div className="container">
        <div className="card">
          <div className="card-header">Endpoints</div>
          <div className="card-body">
            <h5 className="card-title">List of all endpoints:</h5>
            <ul className="list-group">
              {props.tables.map((table, i) => (
                <li key={i} className="list-group-item">
                  <a href={`/${table[props.attributeName]}`}>
                    {table[props.attributeName]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
