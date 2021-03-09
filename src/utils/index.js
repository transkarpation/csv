export const normalizePhone = (phone) => {
  const phoneLength = phone.length;

  switch (phoneLength) {
    case 10:
      return phone;
    case 11:
      return phone.slice(1);
    case 12:
      return phone.slice(2);
    default:
      return phone;
  }
};

export const findDuplicates = (records) => {
  let duplicates = {};
  records.forEach((el, index) => {
    const email = el.email.toLowerCase();
    const phone = normalizePhone(el.phone);

    if (duplicates[email]) {
      duplicates[email].push(index);
    } else {
      duplicates[email] = [index];
    }
    if (duplicates[phone]) {
      duplicates[phone].push(index);
    } else {
      duplicates[phone] = [index];
    }
  });

  let result = [];
  records.forEach((el, index) => {
    const email = el.email.toLowerCase();
    const phone = normalizePhone(el.phone);

    result[index] = {};

    if (duplicates[email].length > 1) {
      result[index].email = duplicates[email];
    } else {
      result[index].email = [];
    }

    if (duplicates[phone].length > 1) {
      result[index].phone = duplicates[phone];
    } else {
      result[index].phone = [];
    }
  });

  return result;
};

export const states = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
}

export const filterStates = (sts) => {
  return sts.split('|').map(el => {
    if(el.length === 2) {
      return el
    } else {
      return states[el]
    }
  })
}
