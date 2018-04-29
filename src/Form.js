import React, { Component } from "react";
import styles from "./Form.css";
import PlacesAutocomplete from "react-places-autocomplete";

class Form extends Component {
  render() {
    return (
      <form name="search" onSubmit={this.props.handleFormSubmit} className={styles.Form}>
          <div className="control">
            <PlacesAutocomplete  
              className="controlsearch"
              inputProps={this.props.inputProps}
            />
            <button type="submit" className="button is-info" value="Search">Search</button>
          </div>
      </form>
    );
  }
};
export default Form;