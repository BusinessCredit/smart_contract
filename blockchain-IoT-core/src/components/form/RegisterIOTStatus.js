/* eslint-disable react/prop-types */
import React from 'react';

const registerIOTStatus = props => (
  <div className="uk-card uk-card-default uk-card-body">
    <h3 className="uk-card-title">Update Status</h3>
    <p>After creating new IOT Smart Contract, you should be able to update Device/Product status</p>
    <form>
      <fieldset className="uk-fieldset">

        <div className="uk-margin">
          <input className="uk-input" type="text" placeholder="ipfs" name="ifps"
            onChange={props.onChange} value={props.state.ipfs} />
        </div>

        <div className="uk-margin">
          <input className="uk-input" type="text" placeholder="event" name="event"
            onChange={props.onChange} value={props.state.event} />
        </div>

        <div className="uk-margin">
          <input className="uk-input" type="text" placeholder="comment" name="comment"
            onChange={props.onChange} value={props.state.comment} />
        </div>

        <div className="uk-margin">
          <input className="uk-input" type="text" placeholder="id" name="id"
            onChange={props.onChange} value={props.state.id} />
        </div>

        <div className="uk-margin">
          <button className="uk-button uk-button-default"
            disabled={props.state._disabled} onClick={props.onSubmit}>Update</button>
        </div>

      </fieldset>
    </form>
  </div>
);


export default registerIOTStatus;

