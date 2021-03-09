import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import cn from "classnames";
import parse from "csv-parse";

import "./CsvInput.css";

function CsvInput({setRecords}) {
  const [text, setText] = useState("");
  const [csv, setCsv] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    if (text.length > 0) {
      parse(
        text, 
        {
          delimiter: ";",
          trim: true,
          columns: (headers) => {
            return headers.map(h => h.toLowerCase())
          } 
        },
        (err, records) => {
          setCsv(records)
        }
      )
    }
  }, [text]);

  useEffect(() => {
    if (csv.length) {
      // check csv for required fields
      const hasError = csv.some(record => {
        const headers = Object.keys(record)
        const isValid = ['full name', 'phone', 'email'].every(el => {
          return headers.indexOf(el) !== -1 && record[el].length > 0;
        })
        return !isValid
      })

      if(hasError) {
        return setError('File format is not correct')
      } else {
        setRecords(csv)
      }
    }
  }, [csv, setRecords]);

  const onChange = (e) => {
    const file = e.target.files[0];
    let fr = new FileReader();
    fr.onload = () => {
      setText(fr.result);
    };

    fr.readAsText(file);
  };

  return (
    <div className={cn("csv-input")}>
      <label className={cn("csv-input__label")}>
        Import users
        <input
          className={cn("csv-input__input")}
          type="file"
          accept=".csv"
          onChange={onChange}
          name="csv"
        />
      </label>
      {
        error
          ? (
            <div className="csv-input__error">
              {error}
            </div>
          )
          : null
      }
    </div>
  );
}

CsvInput.propTypes = {
  setRecords: PropTypes.func
}

export default CsvInput
