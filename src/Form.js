import React, { Component } from "react";
import styles from "./Form.css";
import PlacesAutocomplete from "react-places-autocomplete";

class Form extends Component {

  render() {
    return (
      <form name="search" onSubmit={this.props.handleFormSubmit} className={styles.Form}>
        <PlacesAutocomplete inputProps={this.props.inputProps} placeholder="City name" />
        <input type="submit" className="button" value="Search" />
      </form>
    );
  }
};
export default Form;