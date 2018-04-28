import React, { Component } from "react";
import styles from "./Form.css";
import PlacesAutocomplete from "react-places-autocomplete";

class Form extends Component {
  render() {
    return (
      <div className="field has-addons">
        <form name="search" onSubmit={this.props.handleFormSubmit} className={styles.Form}>
          <div className="control">
            <PlacesAutocomplete className="column is-10" inputProps={this.props.inputProps} />
          </div>
          <div className="control">
            <input type="submit" className="column is-2 button" value="Search" />
          </div>
        </form>
      </div>
    );
  }
};
export default Form;