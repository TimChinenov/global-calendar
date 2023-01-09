import { DateInput } from "date-picker-svelte";
import moment, { MomentZone } from "moment-timezone";
import { useState } from "react";
import Calendar from "../calendar/calendar";

export function CalendarCompare() {
    const [firstLocation, setFirstLocation] = useState('Select location');
    const [secondLocation, setSecondLoaction] = useState('Select location');

    const [firstTimezone, setFirstTimezone] = useState<MomentZone | null>();
    const [secondTimezone, setSecondTimezone] = useState<MomentZone | null>();

    const [meetingLength, setMeetingLength] = useState(0);

    let date = new Date();

    const timezones: string[] = moment.tz.names();
    const timezonesSelection: any[] = []
    timezones.forEach((timezone) => {
        timezonesSelection.push(
            <option>{timezone}</option>
        )
    })

    return(
        <div className="grid grid-cols-2 place-items-center">
            <div className="grid-rows-4">
                <div>
                    <p>{ firstLocation }</p>
                    <p>{ firstTimezone?.offsets[0]}</p>
                </div>
                
                <div>
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

                <div>
                    <input 
                        type="date"
                        className="input input-bordered w-full max-w-xs"/>
                </div>
                
                <div>
                    <input
                        type="number"
                        placeholder="Meeting Length"
                        onBlur={(event) => setMeetingLength(parseInt(event.target.value))} 
                        className="input input-bordered w-full max-w-xs" />
                </div>
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
                <Calendar meetingLength={meetingLength} offset={0} date={date}/>
            </div>

            <div className="w-3/4">
                <Calendar meetingLength={meetingLength} offset={0} date={date}/>
            </div>
        </div>
    )
}