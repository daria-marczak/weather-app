import React, { Component } from "react";
import styles from "./Form.css";
import PlacesAutocomplete from "react-places-autocomplete";

class Form extends Component {
  onClick(e) {
    e.target.value = "";
  }

  render() {
    return (
      <form name="search" onClick={this.onClick} className={styles.Form}>
        <div className="control">
          <PlacesAutocomplete
            className="controlsearch"
            inputProps={this.props.inputProps}
            onEnterKeyDown={this.props.handleFormSubmit}
          />
        </div>
      </form>
    );
  }
}
export default Form;
