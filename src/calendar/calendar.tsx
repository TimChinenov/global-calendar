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
        date: Moment
        timezone1: MomentZone | null,
        timezone2?: MomentZone | null}) {

    const [boxStart, setBoxStart] = useState(0);
    const [onlyBusinessHours, setOnlyBusinessHours] = useState(false);
    const [onlyWakingHours, setOnlyWakingHours] = useState(false);

    const wakingHourStart = 5
    const wakingHourEnd = 21
    const businessHourStart = 6
    const businessHourEnd = 18

    let hourSections: any[] = []

    let startTimeLocal: Moment = moment.tz()
    let startTimeForeign: Moment = moment.tz()

    if (timezone1 && timezone2) {
        startTimeLocal = moment(date.format('YYYY-MM-DD')).tz(timezone1.name)?.startOf("day")
        
        // moment for some reason decrements the input date by one day
        startTimeLocal.add(1, 'day')
        startTimeForeign = startTimeLocal?.clone().tz(timezone2.name)
    }

    for(var count = 0; count < 25; count++) {
        const currentCount = count * 10

        if (onlyWakingHours
            && ((startTimeLocal.hour() <= wakingHourStart || startTimeLocal.hour() >= wakingHourEnd)
            || (startTimeForeign.hour() <= wakingHourStart || startTimeForeign.hour() >= wakingHourEnd))) {
                if (count != 0) {
                    incrementToTime(startTimeLocal)
                    incrementToTime(startTimeForeign)
                }
                
                continue
        }
        else if (onlyBusinessHours
            && ((startTimeLocal.hour() <= businessHourStart || startTimeLocal.hour() >= businessHourEnd)
            || (startTimeForeign.hour() <= businessHourStart || startTimeForeign.hour() >= businessHourEnd))) {
                if (count != 0) {
                    incrementToTime(startTimeLocal)
                    incrementToTime(startTimeForeign)
                }
                
                continue
        }

        hourSections.push(
            <div key={`${calendarId}-${count}`} className="grid grid-cols-6">
                <div className="col-span-1 border-t-[1px] border-t-slate-500 border-b-slate-500">
                    <p>{ count == 0 ? startTimeLocal?.format("hh:mm a") : incrementToTime(startTimeLocal) }</p>
                    <strong>{ (startTimeLocal.format("hh:mm a") === ("12:00 am") || hourSections.length === 0) 
                            && startTimeLocal.format('LL') }
                    </strong>
                </div>
                <div className="
                    col-span-4
                    w-full
                    h-24
                    border-t-[1px] border-t-slate-500 border-b-slate-500">
                    <div
                        className="relative h-6 border-b-slate-500 hover:border-t-[#df9896] border-t-[1px]"
                        onClick={() => {
                            setBoxStart(currentCount + 2)
                        }}>
                            { (boxStart && boxStart == currentCount + 2) ?
                                getMeetingBlock(
                                    startTimeLocal.clone(),
                                    startTimeForeign.clone(),
                                    0,
                                    meeting.lengthMinutes) : <div></div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-[#df9896]"
                        onClick={() => {
                            setBoxStart(currentCount + 4)
                        }}>
                            { (boxStart && boxStart == currentCount + 4) ?
                                getMeetingBlock(
                                    startTimeLocal.clone(),
                                    startTimeForeign.clone(),
                                    15,
                                    meeting.lengthMinutes) : <div></div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-[#df9896]"
                        onClick={() => {
                            setBoxStart(currentCount + 6)
                        }}>
                            { (boxStart && boxStart == currentCount + 6) ?
                                getMeetingBlock(
                                    startTimeLocal.clone(),
                                    startTimeForeign.clone(),
                                    30,
                                    meeting.lengthMinutes) : <div></div>
                            }
                    </div>
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-[#df9896]"
                        onClick={() => {
                            setBoxStart(currentCount + 8)
                        }}>
                            { (boxStart && boxStart == currentCount + 8) ?
                                getMeetingBlock(
                                    startTimeLocal.clone(),
                                    startTimeForeign.clone(),
                                    45,
                                    meeting.lengthMinutes) : <div></div>
                            }
                    </div>
                </div>
                <div className="col-span-1 border-t-[1px] border-t-slate-500 border-b-slate-500 text-right">
                    <p>{ count == 0 ? startTimeForeign?.format("hh:mm a") : incrementToTime(startTimeForeign)  }</p>
                    <strong>{ (startTimeForeign.format("hh:mm a") === ("12:00 am") || hourSections.length === 0)
                            && startTimeForeign.format('LL') }
                    </strong>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full ">
            <div className="w-full flex flex-row place-content-center md:place-content-end">
                <div className="form-control pr-4">
                    <label className="cursor-pointer label">
                        <span className="label-text pr-2">Only Waking Hours</span> 
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={onlyWakingHours}
                            onChange={() => {
                                setOnlyBusinessHours(false)
                                setOnlyWakingHours(!onlyWakingHours)
                            }}/>
                    </label>
                </div>
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text pr-2">Only Business Hours</span> 
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={onlyBusinessHours}
                            onChange={() => {
                                setOnlyWakingHours(false)
                                setOnlyBusinessHours(!onlyBusinessHours)
                            }}/>
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    { parseTimezoneName(timezone1?.name ?? "")}
                </div>
                <div className="text-right">
                    { parseTimezoneName(timezone2?.name ?? "")}
                </div>
            </div>
            <div className="h-full w-full border-b-[1px]">
                { hourSections }
            </div>
        </div>
    )
}

function getMeetingBlock(
    startTimeLocal: Moment,
    startTimeForeign: Moment,
    minuteOffset: number,
    meetingLength: number) {
    if (!meetingLength) {
        return
    }

    startTimeLocal.add(minuteOffset, "minutes")
    startTimeForeign.add(minuteOffset, "minutes")
    meetingLength = meetingLength < 15 ? 1 : meetingLength / 15

    return (
        <div
            className="w-full bg-[#9fba86] absolute z-10 rounded"
            style={{height: `${24 * meetingLength}px`}}>
                <div className="grid grid-cols-2">
                    <p className="text-sm text-center">{startTimeLocal.format("hh:mm a")} - {startTimeLocal.add(meetingLength * 15, "minutes").format("hh:mm a")} {startTimeLocal.format('z')}</p>
                    <p className="text-sm text-center">{startTimeForeign.format("hh:mm a")} - {startTimeForeign.add(meetingLength * 15, "minutes").format("hh:mm a")} {startTimeForeign.format('z')}</p>
                </div>
        </div>
    )
}

function incrementToTime(startTime: Moment): string {
    startTime?.add(1, "hours");

    return startTime?.format("hh:mm a")
}

function parseTimezoneName(name: string): string {
    return name.replaceAll("_", " ")
}

// function getFormattedDate(date: ): string {
//     let year = date.getFullYear().toString();
//     let month = (date.getMonth() + 1).toString()
//     let day = date.getDate().toString()
//     month = month.length < 2 ? "0" + month : month
//     day = day.length < 2 ? "0" + day : day

//     return `${year}-${month}-${day}`
// }