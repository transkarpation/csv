import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default function Date() {
    dayjs.extend(customParseFormat)

    const valid = dayjs('20-11-12','YYYY-MM-DD', true).isValid()
    console.log(valid)

    return (
        <div>
            Date.js
        </div>
    )
}
