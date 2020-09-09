import React, { Component } from 'react';
import {Link} from "react-router-dom";

class ProvinceItem extends Component {
    render() {
        const {province} = this.props;

        return (
            <tr>
              <td>{province.name}</td>
              <td>
                <Link className= "btn btn-outline-danger">Delete</Link>
              </td>
            </tr>
        )
    }
}
export default ProvinceItem;