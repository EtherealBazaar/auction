import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { selectors } from "../reducers";
import { changeLocation, fetchProjects } from "../actions";
import locations from "../locations";

import * as parcelUtils from "../lib/parcelUtils";

import Search from "../components/Search";

class SearchContainer extends React.Component {
  static propTypes = {
    projects: PropTypes.array
  };

  componentWillMount() {
    this.props.fetchProjects();
  }

  onSelect = coordinate => {
    const [x, y] = coordinate.split(",");
    this.props.changeLocation(locations.parcelDetail(x, y));
  };

  getCoordinates() {
    return parcelUtils
      .generateMatrix(-160, -160, 160, 160)
      .map(coordinate => ({ name: coordinate }));
  }

  render() {
    return (
      <Search
        coordinates={this.getCoordinates()}
        projects={this.props.projects}
        onSelect={this.onSelect}
      />
    );
  }
}

export default connect(
  state => ({
    projects: selectors.getProjectsData(state)
  }),
  { changeLocation, fetchProjects }
)(SearchContainer);