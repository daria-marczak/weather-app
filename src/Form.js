import React, { Component } from "react";
import styles from "./Form.css";
import PlacesAutocomplete from "react-places-autocomplete";

class Form extends Component {
  onClick(e) {
    e.target.value = "";
  }
  
  render() {
    return (
      <form name="search" onClick={this.onClick} onSubmit={this.props.handleFormSubmit} className={styles.Form}>
          <div className="control">
            <PlacesAutocomplete  
              className="controlsearch"
              inputProps={this.props.inputProps}
            />
            <button type="submit" className="button" value="Search">Search</button>
          </div>
      </form>
    );
  }
};
export default Form;