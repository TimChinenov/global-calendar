import moment, { MomentZone } from "moment-timezone";
import { useState } from "react";
import Calendar from "../calendar/calendar";
import { Meeting } from "../dtos/meeting";

export function CalendarCompare() {
    const [firstLocation, setFirstLocation] = useState('Select location');
    const [secondLocation, setSecondLoaction] = useState('Select location');

    const [firstTimezone, setFirstTimezone] = useState<MomentZone | null>();
    const [secondTimezone, setSecondTimezone] = useState<MomentZone | null>();

    const [meetingLength, setMeetingLength] = useState(1);
    const [date, setDate] = useState(new Date());

    let meetingLengthMinutes: 15;

    const timezones: string[] = moment.tz.names();
    const timezonesSelection: any[] = []
    timezones.forEach((timezone) => {
        timezonesSelection.push(
            <option key={timezone}>{timezone}</option>
        )
    })

    return(
        <div className="grid sm:grid-cols-1 md:grid-cols-2">
            <div className="pt-4 grid-rows-4 pl-4">
                <div className="grid grid-cols-2 grid-gap-2 pb-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Local Timezone</span>
                        </label>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            onChange={(event) => {
                                setFirstLocation(event.target.value)
                                setFirstTimezone(moment.tz.zone(event.target.value))
                            }}>
                            { timezonesSelection }
                        </select>
                    </div>
                    
                    <div>
                        <label className="label">
                            <span className="label-text">Foreign Timezone</span>
                        </label>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            onChange={(event) => {
                                setSecondLoaction(event.target.value)
                                setSecondTimezone(moment.tz.zone(event.target.value))
                            }}>
                            { timezonesSelection }
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 grid-gap-2">
                    <div>
                        <label className="label">
                            <span className="label-text">Local Date</span>
                        </label>
                        <input 
                            type="date"
                            className="input input-bordered w-full max-w-xs"
                            onBlur={(event) => setDate(new Date(event.target.value))}/>
                    </div>
                    
                    <div>
                        <label className="label">
                            <span className="label-text">Meeting Length (Minutes)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Meeting Length in Minutes"
                            value={meetingLength}
                            onChange={(event) => {
                                let minutes = parseInt(event.target.value)
                                setMeetingLength(minutes)
                            }} 
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
            </div>

            <div className="w-3/4 pt-12">
                <Calendar
                    calendarId={1}
                    meeting={getMeeting(firstTimezone ?? null, meetingLength)}
                    date={date}
                    timezone1={firstTimezone ?? null}
                    timezone2={secondTimezone ?? null} />
            </div>
        </div>
    )
}

function getMeeting(timezone: MomentZone | null, length: number): Meeting {
    return {
        timezone: timezone,
        lengthMinutes: length
    }
}