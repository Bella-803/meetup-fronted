import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class SectorItem extends Component {
    render() {
        const {sector} = this.props
        return (
            <tr>
                <td>{sector.name}</td>
                <td>{sector.district.name}</td>
                <td>{sector.district.province.name}</td>
                <td>
                  <Link class="btn btn-outline-danger">Delete</Link>
                </td>
            </tr>
        )
    }
}
