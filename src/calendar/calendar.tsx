import moment from "moment";
import { Moment, MomentZone } from "moment-timezone";
import { useState } from "react";
import { Meeting } from "../dtos/meeting";
import _ from "lodash";

export default function Calendar({
        calendarId,
        meeting,
        setMeetingTime,
        date,
        localTimezone,
        foreignTimezones
    } : { 
        calendarId: number,
        meeting: Meeting,
        setMeetingTime: any,
        date: Moment
        localTimezone: MomentZone | null,
        foreignTimezones: (MomentZone | null)[] }) {

    const [boxStart, setBoxStart] = useState(0);
    const [onlyBusinessHours, setOnlyBusinessHours] = useState(false);
    const [onlyWakingHours, setOnlyWakingHours] = useState(false);

    const wakingHourStart = 5
    const wakingHourEnd = 21
    const businessHourStart = 6
    const businessHourEnd = 18

    let hourSections: any[] = []
    let lastCount = 0;

    let startTimeLocal: Moment = moment.tz()
    let startTimeForeign: Moment = moment.tz()
    let startTimesForeign: (Moment | null)[] = []

    if (localTimezone) {
        startTimeLocal = moment(date.format('YYYY-MM-DD')).tz(localTimezone.name)?.startOf("day")
    }

    for(let foreignTimezone of foreignTimezones) {
        if (foreignTimezone && startTimeLocal?.isValid()) {
            startTimesForeign.push(startTimeLocal?.clone().tz(foreignTimezone?.name ?? ""))
        } else {
            startTimesForeign.push(null)
        }
        
    }

    for(var count = 0; count < 25; count++) {
        const currentCount = count * 10

        if (onlyWakingHours
            && !timesAreInBounds(wakingHourStart, wakingHourEnd, [startTimeLocal, ...startTimesForeign])) {
                if (count != 0) {
                    incrementToTime(startTimeLocal)
                    startTimesForeign.forEach((foreignTime) => {
                        if (foreignTime) {
                            incrementToTime(foreignTime)
                        }
                    })
                }
                
                continue
        }
        else if (onlyBusinessHours
            && !timesAreInBounds(businessHourStart, businessHourEnd, [startTimeLocal, ...startTimesForeign])) {
                if (count != 0) {
                    incrementToTime(startTimeLocal)
                    startTimesForeign.forEach((foreignTime) => {
                        if (foreignTime) {
                            incrementToTime(foreignTime)
                        }
                    })
                }
                
                continue
        }

        if (count!= 0 && hourSections.length != 0 && lastCount != count - 1) {
            hourSections.push(<div className="w-full text-center pt-2 pb-6"><strong>. . .</strong></div>)
        }

        lastCount = count
        let startTimeLocalInstant = startTimeLocal.clone()
        
        if (count != 0) {
            startTimeLocalInstant.add(1, "hours")
        }

        hourSections.push(
            <div key={`${calendarId}-${count}`} className="flex flex-wrapped">
                <div className="w-[30%] border-t-[1px] border-t-slate-500 border-b-slate-500 text-sm md:text-base">
                    <p>{ count == 0 ? startTimeLocal?.format("hh:mm a") : incrementToTime(startTimeLocal) }</p>
                    <strong className="text-sm">{ (startTimeLocal.format("hh:mm a") === ("12:00 am") || hourSections.length === 0) 
                            && startTimeLocal.format('ll') }
                    </strong>
                </div>
                <div className="w-full border-t-[1px] border-t-slate-500 border-b-slate-500 cursor-pointer">
                    <div
                        className="relative h-6 border-b-slate-500 border-t-[1px] border-b-[1px] 
                            hover:border-t-accent-focus hover:border-b-accent-focus hover:border-t-[2px] hover:border-b-[2px]"
                        onClick={() => {
                            console.log(startTimeLocalInstant.format("hh:mm a"))
                            setMeetingTime(startTimeLocalInstant)
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
                        className="relative h-6 border-b-slate-500 border-t-[1px] border-b-[1px] 
                            hover:border-t-accent-focus hover:border-b-accent-focus hover:border-t-[2px] hover:border-b-[2px]"
                        onClick={() => {
                            setMeetingTime(startTimeLocalInstant.add(15, "minutes"))
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
                        className="relative h-6 border-b-slate-500 border-t-[1px] border-b-[1px] 
                            hover:border-t-accent-focus hover:border-b-accent-focus hover:border-t-[2px] hover:border-b-[2px]"
                        onClick={() => {
                            setMeetingTime(startTimeLocalInstant.add(30, "minutes"))
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
                        className="relative h-6 border-t-[1px] border-b-[1px] 
                            hover:border-t-accent-focus hover:border-b-accent-focus hover:border-t-[2px] hover:border-b-[2px]"
                        onClick={() => {
                            setMeetingTime(startTimeLocalInstant.add(45, "minutes"))
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
                {
                    startTimesForeign?.map((foreignTimezone: Moment | null) => {
                        return (
                            foreignTimezone?.isValid() ?
                            <div className="w-[30%] border-t-[1px] border-t-slate-500 border-b-slate-500 text-right text-sm md:text-base">
                                <p>{ count == 0 ? foreignTimezone?.format("hh:mm a") : incrementToTime(foreignTimezone)  }</p>
                                <strong className="text-sm">{ (foreignTimezone.format("hh:mm a") === ("12:00 am") || hourSections.length === 0)
                                        && foreignTimezone.format('ll') }
                                </strong>
                            </div> 
                            : 
                            <div className="w-[30%] border-t-[1px] border-t-slate-500 border-b-slate-500 text-right">
                            </div>
                        )
                    })
                }
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

            <div className="flex flex-wrapped">
                <div className="w-[30%]">
                    { parseTimezoneName(localTimezone?.name ?? "")}
                </div>
                <div className="w-full"></div>
                {
                    foreignTimezones.map((value) => {
                        return (
                            <div className="w-[30%] text-right col-span-1 text-sm md:text-base pr-1">
                                { parseTimezoneName(value?.name ?? "")}
                            </div>
                        )
                    })
                }
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

        if (meetingLength > 180) {
            return
        }

        startTimeLocal.add(minuteOffset, "minutes")
        startTimeForeign.add(minuteOffset, "minutes")
        meetingLength = meetingLength < 15 ? 1 : meetingLength / 15

        const middleColumn: any = (contents: any) => {
            return(
            <div
                className="bg-[#9fba86] absolute z-10 rounded-lg w-11/12 left-0 right-0 mr-auto ml-auto"
                style={{height: `${24 * meetingLength}px`}}>
                    { contents }
            </div>)
        }

        const meetingLengthContent = () => {
            <div className="grid grid-cols-2">
                <p className="text-sm text-center">{startTimeLocal.format("hh:mm a")} - {startTimeLocal.add(meetingLength * 15, "minutes").format("hh:mm a")} {startTimeLocal.format('z')}</p>
                <p className="text-sm text-center">{startTimeForeign.format("hh:mm a")} - {startTimeForeign.add(meetingLength * 15, "minutes").format("hh:mm a")} {startTimeForeign.format('z')}</p>
            </div>
        }

        return (
            <div>
                { middleColumn(meetingLengthContent()) }
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

function timesAreInBounds(startTime: number, endTime: number, times: (Moment | null)[]): boolean {
    let isInBounds: boolean = true

    for(var time of times) {
        if (time && (time.hour() <= startTime || time.hour() >= endTime)) {
            isInBounds = false
        }
    }

    return isInBounds
}
