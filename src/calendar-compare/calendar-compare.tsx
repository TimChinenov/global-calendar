import Autocomplete from "../autocomplete/autocomplete";
import Calendar from "../calendar/calendar";
import { Meeting } from "../dtos/meeting";
import moment, { MomentZone } from "moment-timezone";
import { useState } from "react";

export function CalendarCompare() {
    const [firstTimezone, setFirstTimezone] = useState<MomentZone | null>();
    const [secondTimezone, setSecondTimezone] = useState<MomentZone | null>();

    const [meetingLength, setMeetingLength] = useState(30);
    const [date, setDate] = useState(moment());

    const timezones: string[] = moment.tz.names();
    const timezonesSelection: any[] = []
    timezones.forEach((timezone) => {
        timezonesSelection.push(
            <option key={timezone}>{timezone}</option>
        )
    })

    return(
        <div className="grid sm:grid-cols-1 md:grid-cols-2 md:mx-20">
            <div className="md:grid-rows-2 mx-8">
                <div>
                    <h2 className="pt-2 flex"><strong className="text-primary">Thyme</strong><p className="pr-2">zones</p>  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="36px" height="36px"><defs opacity=".43"><polygon id="_bm2VFxReIytouHmpBCUXa" points="51,-62.075 2,-62.075 1,-112.925 50,-112.925" opacity=".43"/></defs><path fill="#c0ca33" d="M22,39c0,0,0.004,0.572,0.874,0.851c0.622-1.427,1.084-2.923,1.355-4.452	c0.64-3.671,0.118-7.557-1.727-10.749c-0.935-1.583-2.187-2.978-3.696-4.065c-1.483-1.143-3.237-1.774-5.092-2.642	c-1.816-0.846-3.586-1.806-5.269-2.909C6.8,13.902,5.118,12.682,4,11c1.461,1.348,3.248,2.209,4.985,3.092	c1.759,0.856,3.564,1.613,5.385,2.335c1.774,0.683,3.81,1.379,5.525,2.617c1.744,1.181,3.239,2.744,4.369,4.541	c0.833,1.32,1.433,2.754,1.832,4.24C31.851,17.919,19.953,10.994,12,10C4,9,0,5,0,5s0.241,12.741,11,23c2.118,2.019,5,4,11,4	C23,32,22,39,22,39z"/><path fill="#c0ca33" d="M37,25c-4.688-1.172-7.93-0.343-10.645,3.034C25.468,29.138,25,30.524,25,31.941	c0,0.019,0,0.039,0,0.059c1-2,2.324-2.766,2.763-3.027c1.735-1.048,3.685-1.477,5.571-1.646c1.891-0.165,3.787-0.045,5.593,0.258	c0.904,0.125,1.779,0.316,2.638,0.292c0.426-0.021,0.848-0.084,1.262-0.226C43.241,27.506,43.62,27.261,44,27	c-0.537,0.736-1.385,1.331-2.351,1.52c-0.954,0.191-1.904,0.195-2.811,0.181c-1.816-0.024-3.579,0.003-5.306,0.265	c-1.712,0.282-3.368,0.8-4.742,1.674c-0.691,0.432-1.291,0.972-1.777,1.582C24,36,24,40,24,40s1,0,1.837-0.821L26,39	c0,0,0.003-1.096,1.218-2.88C28.558,36.805,35.961,39.847,45,29l3-4.213C48,24.787,45,27,37,25z"/></svg></h2>
                    <div className="grid md:grid-cols-2 md:gap-4 md:pb-4">
                        <Autocomplete
                            title={"Local Timezone"}
                            setValue={(value: string) => setFirstTimezone(moment.tz.zone(value))}/>
                        <Autocomplete
                            title={"Foreign Timezone"}
                            setValue={(value: string) => setSecondTimezone(moment.tz.zone(value))}/>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Local Date</span>
                            </label>
                            <input
                                alt="date input"
                                type="date"
                                className={`input input-bordered w-full md:max-w-xs ${!moment(date).isValid() ? "input-error" : ""}`}
                                placeholder="MM/DD/YYYY"
                                onChange={(event) => {
                                    setDate((moment(event.target.value)))
                                }}/>
                            { !moment(date).isValid() && <p className="text-error">Invalid date format</p>}
                        </div>
                        
                        <div>
                            <label className="label">
                                <span className="label-text">Meeting Length (Min)</span>
                            </label>
                            <input
                                alt="meeting length in minutes"
                                type="number"
                                placeholder="Meeting Length in Minutes"
                                value={meetingLength}
                                onChange={(event) => {
                                    let minutes = parseInt(event.target.value)
                                    setMeetingLength(minutes)
                                }} 
                                className={`input input-bordered w-full md:max-w-xs ${meetingLength < 15 || meetingLength > 180? "input-error" : ""}`} />
                            { meetingLength < 15 && <p className="text-error">Meeting minimum is 15 min</p>}   
                            { meetingLength > 180 && <p className="text-error">Meeting maximum is 180 min</p>}    
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-4 md:mx-8 pt-6 md:pt-12">
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