/* eslint-disable react/prop-types,react/jsx-key */
import React from 'react';

const IOTStatus = (props) => {
  const ids = [];
  const addresses = [];

  props.IOTs.forEach((status) => {
    ids.push(<li key={status.id}> {status.id} </li>);
    addresses.push(<li key={status.id}> {status.address} </li>);
  });

  return (

    <div className="uk-card uk-card-default uk-card-body">
      <h3 className="uk-card-title">IOT Device/Product Status</h3>
      <div className="uk-child-width-expand@s uk-grid ">
        <div>
          <h5>Id</h5>
          <ul className="uk-list uk-list-large">
            {ids}
          </ul>
        </div>
        <div>
          <h5>Status</h5>
          <ul className="uk-list uk-list-large">
            {addresses}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default IOTStatus;

