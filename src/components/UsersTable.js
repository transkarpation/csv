import React, {useEffect, useState} from "react";
import propTypes from "prop-types";

import './UsersTable.css';
import UsersTableRow from "./UsersTableRow";
import { findDuplicates } from "../utils";

function UsersTable({ records }) {
    const [duplicates, setDuplicates] = useState([])

    useEffect(() => {
      setDuplicates(findDuplicates(records))
    }, [records])

    if (!records.length) return null

    return (
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            {
              Object.keys(records[0]).map((header, index) => <th key={index}>{header.toUpperCase()}</th>)
            }
            <th>Duplicate with</th>
          </tr>
        </thead>
        <tbody>
          {
            records.map((r, index) => <UsersTableRow key={index} index={index} record={r} duplicates={duplicates[index] || {email: [], phone: []}} />)
          }
        </tbody>
      </table>
    )
}

UsersTable.propTypes = {
  records: propTypes.array,
};

export default UsersTable;
