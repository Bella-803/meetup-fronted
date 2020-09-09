import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class DistrictItem extends Component {
    render() {
        const {district} = this.props
        return (
            <tr>
              <td>{district.name}</td>
              <td>{district.province.name}</td>
              <td>
                <Link className="btn btn-outline-danger">Delete</Link>
              </td>
            </tr>
        )
    }
}
