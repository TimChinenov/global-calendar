import moment from "moment";
import { Moment, MomentZone } from "moment-timezone";
import { useState } from "react";
import { Meeting } from "../dtos/meeting";

export default function Calendar({
        calendarId,
        meeting,
        date,
        timezone,
        comparedTimezone,
    } : { 
        calendarId: number,
        meeting: Meeting,
        date: Date,
        timezone: MomentZone | null,
        comparedTimezone?: MomentZone | null}) {

    const [boxStart, setBoxStart] = useState(0);

    let hourSections: any[] = []

    let startTime: Moment = moment.tz(timezone?.name ?? "")?.startOf("day")

    if (comparedTimezone) {
        startTime = moment.tz(comparedTimezone?.name ?? "")?.startOf("day")
    }

    let convertedStartTime: Moment = startTime?.tz(timezone?.name ?? "") ?? null;

    for(var count = 0; count < 25; count++) {
        const currentCount = count * 10
        hourSections.push(
            <div key={`${calendarId}-${count}`} className="grid grid-cols-6">
                <div className="col-span-1 border-t-[1px] border-t-slate-50 border-b-slate-50">
                    { count == 0 ? convertedStartTime?.format("hh:mm a") : incrementToTime(convertedStartTime)  }
                </div>
                <div className="
                    col-span-5
                    w-full
                    h-24
                    border-t-[1px] border-t-slate-50 border-b-slate-50">
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300 border-t-[1px]"
                        onClick={() => {
                            setBoxStart(currentCount + 2)
                        }}>
                            { (boxStart && boxStart == currentCount + 2) &&
                                <div
                                    className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300"
                        onClick={() => {
                            setBoxStart(currentCount + 4)
                        }}>
                            { (boxStart && boxStart == currentCount + 4) &&
                                <div 
                                    className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300"
                        onClick={() => {
                            setBoxStart(currentCount + 6)
                        }}>
                            { (boxStart && boxStart == currentCount + 6) &&
                                <div
                                    className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300"
                        onClick={() => {
                            setBoxStart(currentCount + 8)
                        }}>
                            { (boxStart && boxStart == currentCount + 8) &&
                                <div
                                    className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full">
            <h2>time selected: { boxStart }</h2>
            <h2>length: { meeting.length }</h2>
            <div className="h-full w-full border-b-[1px]">
                { hourSections }
            </div>
        </div>
    )
}

function incrementToTime(startTime: Moment): string {
    startTime?.add(1, "hours");

    return startTime?.format("hh:mm a")
}