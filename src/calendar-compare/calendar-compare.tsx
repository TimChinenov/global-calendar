import moment, { MomentZone } from "moment-timezone";
import { useState } from "react";
import Calendar from "../calendar/calendar";
import { Meeting } from "../dtos/meeting";

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
            <option key={timezone}>{timezone}</option>
        )
    })

    return(
        <div className="grid grid-cols-2 place-items-center">
            <div className="grid-rows-4">
                <div className="pt-12">
                    <select
                        className="select w-full max-w-xs"
                        onChange={(event) => {
                            setFirstLocation(event.target.value)
                            setFirstTimezone(moment.tz.zone(event.target.value))
                        }}>
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
                <select
                    className="select w-full max-w-xs"
                    onChange={(event) => {
                        setSecondLoaction(event.target.value)
                        setSecondTimezone(moment.tz.zone(event.target.value))
                    }}>
                    { timezonesSelection }
                </select>
            </div>
            

            <div className="w-3/4">
                <Calendar
                    calendarId={1}
                    meeting={getMeeting(firstTimezone ?? null, meetingLength)}
                    date={date}
                    timezone={firstTimezone ?? null} />
            </div>

            <div className="w-3/4">
                <Calendar
                    calendarId={2}
                    meeting={getMeeting(secondTimezone ?? null, meetingLength)}
                    date={date}
                    timezone={secondTimezone ?? null}
                    comparedTimezone={firstTimezone ?? null}/>
            </div>
        </div>
    )
}

function getMeeting(timezone: MomentZone | null, length: number): Meeting {
    return {
        timezone: timezone,
        length: length
    }
}