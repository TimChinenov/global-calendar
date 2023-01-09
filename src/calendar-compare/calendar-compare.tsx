import moment, { MomentZone } from "moment-timezone";
import { useState } from "react";
import Calendar from "../calendar/calendar";

export function CalendarCompare() {
    const [firstLocation, setFirstLocation] = useState('Select location');
    const [secondLocation, setSecondLoaction] = useState('Select location');

    const [firstTimezone, setFirstTimezone] = useState<MomentZone | null>();
    const [secondTimezone, setSecondTimezone] = useState<MomentZone | null>();

    const timezones: string[] = moment.tz.names();
    const timezonesSelection: any[] = []
    timezones.forEach((timezone) => {
        timezonesSelection.push(
            <option>{timezone}</option>
        )
    })

    return(
        <div className="grid grid-cols-2 place-items-center">
            <div className="grid-rows-3">
                <p>{ firstLocation }</p>
                <p>{ firstTimezone?.offsets[0]}</p>
                <select
                    className="select w-full max-w-xs"
                    onChange={(event) => {
                        setFirstLocation(event.target.value)
                        setFirstTimezone(moment.tz.zone(event.target.value))
                    }}>
                    <option disabled selected>Select location</option>
                    { timezonesSelection }
                </select>
            </div>
            
            <div className="grid-rows-3">
                <p>{ secondLocation }</p>
                <p>{ secondTimezone?.offsets[0]}</p>
                <select
                    className="select w-full max-w-xs"
                    onChange={(event) => {
                        setSecondLoaction(event.target.value)
                        setSecondTimezone(moment.tz.zone(event.target.value))
                    }}>
                    <option disabled selected>Select location</option>
                    { timezonesSelection }
                </select>
            </div>
            

            <div className="w-3/4">
                <Calendar />
            </div>

            <div className="w-3/4">
                <Calendar />
            </div>
        </div>
    )
}