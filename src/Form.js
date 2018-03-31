import React, { Component } from "react";
import styles from "./Form.css";

class Form extends Component {
  render() {
    return (
      <form ref="searchForm" onSubmit={this.props.getWeather} className={styles.Form}>
        <input type="text" name="city" placeholder="City" />
        <input type="submit" className="button" value="Search" />
      </form>
    );
  }
} 

export default Form;
