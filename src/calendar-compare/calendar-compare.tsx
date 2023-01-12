import Autocomplete from "../autocomplete/autocomplete";
import Calendar from "../calendar/calendar";
import { Meeting } from "../dtos/meeting";
import moment, { MomentZone } from "moment-timezone";
import { useState } from "react";

export function CalendarCompare() {
    const [firstTimezone, setFirstTimezone] = useState<MomentZone | null>();
    const [secondTimezone, setSecondTimezone] = useState<MomentZone | null>();

    const [meetingLength, setMeetingLength] = useState(1);
    const [date, setDate] = useState(new Date());

    const timezones: string[] = moment.tz.names();
    const timezonesSelection: any[] = []
    timezones.forEach((timezone) => {
        timezonesSelection.push(
            <option key={timezone}>{timezone}</option>
        )
    })

    return(
        <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-2 mx-24">
            <div className="grid-rows-2 mx-8">
                <div className="fixed">
                    <h2 className="pt-2">Zone Plan</h2>
                    <div className="grid grid-cols-2 gap-4 pb-4">
                        <Autocomplete
                            title={"Local Timezone"}
                            setValue={(value: string) => setFirstTimezone(moment.tz.zone(value))}/>
                        <Autocomplete
                            title={"Foreign Timezone"}
                            setValue={(value: string) => setSecondTimezone(moment.tz.zone(value))}/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="mx-8 pt-12">
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