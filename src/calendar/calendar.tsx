import moment from "moment";
import { Moment, MomentZone } from "moment-timezone";
import { useState } from "react";
import { Meeting } from "../dtos/meeting";

export default function Calendar({
        calendarId,
        meeting,
        date,
        timezone1,
        timezone2,
    } : { 
        calendarId: number,
        meeting: Meeting,
        date: Date,
        timezone1: MomentZone | null,
        timezone2?: MomentZone | null}) {

    const [boxStart, setBoxStart] = useState(0);

    let hourSections: any[] = []

    let startTime: Moment = moment.tz(timezone1?.name ?? "")?.startOf("day")

    if (timezone2) {
        startTime = moment.tz(timezone2?.name ?? "")?.startOf("day")
    }

    let convertedStartTime: Moment = startTime?.tz(timezone1?.name ?? "") ?? null;

    for(var count = 0; count < 25; count++) {
        const currentCount = count * 10
        hourSections.push(
            <div key={`${calendarId}-${count}`} className="grid grid-cols-6">
                <div className="col-span-1 border-t-[1px] border-t-slate-500 border-b-slate-500">
                    { count == 0 ? convertedStartTime?.format("hh:mm a") : incrementToTime(convertedStartTime)  }
                </div>
                <div className="
                    col-span-4
                    w-full
                    h-24
                    border-t-[1px] border-t-slate-500 border-b-slate-500">
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-[#df9896] border-t-[1px]"
                        onClick={() => {
                            setBoxStart(currentCount + 2)
                        }}>
                            { (boxStart && boxStart == currentCount + 2) &&
                                <div
                                    className="w-3/4 bg-[#9fba86] absolute z-10 rounded mx-6"
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-[#df9896]"
                        onClick={() => {
                            setBoxStart(currentCount + 4)
                        }}>
                            { (boxStart && boxStart == currentCount + 4) &&
                                <div 
                                    className="w-3/4 bg-[#9fba86] absolute z-10 rounded mx-6"
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-[#df9896]"
                        onClick={() => {
                            setBoxStart(currentCount + 6)
                        }}>
                            { (boxStart && boxStart == currentCount + 6) &&
                                <div
                                    className="w-3/4 bg-[#9fba86] absolute z-10 rounded mx-6"
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-[#df9896]"
                        onClick={() => {
                            setBoxStart(currentCount + 8)
                        }}>
                            { (boxStart && boxStart == currentCount + 8) &&
                                <div
                                    className="w-3/4 bg-[#9fba86] absolute z-10 rounded mx-6"
                                    style={{height: `${24 * meeting.length}px`}}>
                                </div>
                            }
                    </div>
                </div>
                <div className="col-span-1 border-t-[1px] border-t-slate-500 border-b-slate-500">
                    { count == 0 ? startTime?.format("hh:mm a") : incrementToTime(startTime)  }
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full">
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