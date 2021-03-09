import React, { useEffect, useState } from "react";
import * as yup from "yup";
import propTypes from "prop-types";
import cn from "classnames";
import { states, filterStates } from "../utils/index";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

let schema = yup.object().shape({
  email: yup.string().email(),
  age: yup.number().integer().min(21).max(67),
  experience: yup
    .number()
    .required()
    .integer()
    .min(0)
    .test("experience", "wrong max", function (val) {
      return val <= this.parent.age - 21;
    }),
  "license states": yup
    .string()
    .test("states", "wrong license states", function (val) {
      if (val.length < 2) {
        return false;
      }

      return val.split("|").every((el) => {
        if (el.length === 2) {
          return Object.values(states).indexOf(el) !== -1;
        } else {
          return Object.keys(states).indexOf(el) !== -1;
        }
      });
    }),
  "yearly income": yup.number().max(1000000),
  phone: yup.string().matches(/^\+?1?\d{10}$/),
  "has children": yup.string().matches(/(^$|true|false)$/i),
  "license number": yup.string().matches(/^([a-zA-Z0-9]){6}$/),
  "expiration date": yup
    .string()
    .test("expiration date", "expiration date err", function (value) {
      const isFormatValid = dayjs(
        value,
        ["YYYY-MM-DD", "MM/DD/YYYY"],
        true
      ).isValid();

      if (!isFormatValid) {
        return false;
      } else {
        return !dayjs(value, ["YYYY-MM-DD", "MM/DD/YYYY"], true).isBefore(
          dayjs()
        );
      }
    }),
});

const calculateDuplicates = (d, currentIndex) => {
  if (d) {
    const emails = d.email.filter((el) => el !== currentIndex);
    const phones = d.phone.filter((el) => el !== currentIndex);
    const arr = emails.concat(phones);
    const set = new Set(arr);
    return Array.from(set);
  }
};

function UsersTableRow({ record, index, duplicates }) {
  const [duplicateWith, setDuplicateWith] = useState([]);

  const [error, setError] = useState({ inner: [] });

  useEffect(() => {
    if (duplicates) {
      const result = calculateDuplicates(duplicates, index);
      setDuplicateWith(result);
    }
  }, [duplicates, index]);

  useEffect(() => {
    console.log("validating record");
    schema.validate(record, { abortEarly: false }).catch((err) => {
      setError(err);
    });
  }, [record]);

  return (
    <tr>
      <td>{index + 1}</td>
      {Object.keys(record).map((field) => {
        let classes = {};
        error.inner.forEach((el) => {
          if (el.path === field) {
            classes.error = true;
          }
        });
        if (field === "email" || field === "phone") {
          if (duplicates[field].length > 1) {
            classes.error = true;
          }
        }

        if (field === "license states") {
          return (
            <td className={cn(classes)} key={field}>
              {filterStates(record[field]).join(", ")}
            </td>
          );
        }
        if (field === "yearly income") {
          return (
            <td className={cn(classes)} key={field}>
              {Number.parseFloat(record[field]).toFixed(2)}
            </td>
          );
        }
        return (
          <td className={cn(classes)} key={field}>
            {record[field]}
          </td>
        );
      })}
      <td>{duplicateWith.map((el) => el + 1).join(",")}</td>
    </tr>
  );
}

UsersTableRow.propTypes = {
  record: propTypes.object,
  index: propTypes.number,
  duplicates: propTypes.object.isRequired,
};

export default UsersTableRow;
