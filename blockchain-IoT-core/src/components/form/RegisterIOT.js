/* eslint-disable react/prop-types */
import React from 'react';

const registerIOT = props => (
  <div className="uk-card uk-card-default uk-card-body">
    <h3 className="uk-card-title">Create IOT Smart Contract</h3>
    <p>Create new instance of IOT Devices/Product</p>
    <form>
      <fieldset className="uk-fieldset">
        <div className="uk-margin">
          <button className="uk-button uk-button-default" disabled={props.state._disabled}
            onClick={props.onSubmit}>
            Create
          </button>
        </div>
      </fieldset>
    </form>
  </div>
);


export default registerIOT;

