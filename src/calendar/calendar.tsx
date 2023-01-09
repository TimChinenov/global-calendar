import { useState } from "react";

export default function Calendar(
    {
        meetingLength = 0,
        offset = 0,
        date,
    } : { meetingLength: number, offset: number, date: Date}) {

    const [boxStart, setBoxStart] = useState(0);

    let hourSections: any[] = []
    
    for(var count = 0; count < 25; count++) {
        const currentCount = count * 10
        hourSections.push(
            <div className="grid grid-cols-6">
                <div className="col-span-1 border-t-[1px] border-t-slate-50 border-b-slate-50">
                    { incrementToTime(count, 1) }
                </div>
                <div className="
                    col-span-5
                    w-full
                    h-24
                    border-t-[1px] border-t-slate-50 border-b-slate-50">
                    <div
                        className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300 border-t-[2px]"
                        onClick={() => {
                            setBoxStart(currentCount + 2)
                        }}>
                            { (boxStart && boxStart == currentCount + 2) &&
                                <div
                                    className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                    style={{height: `${24 * meetingLength}px`}}>
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
                                    style={{height: `${24 * meetingLength}px`}}>
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
                                    style={{height: `${24 * meetingLength}px`}}>
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
                                    style={{height: `${24 * meetingLength}px`}}>
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
            <h2>length: { meetingLength }</h2>
            <div className="h-full w-full border-b-[1px]">
                { hourSections }
            </div>
        </div>
    )
}

function incrementToTime(count: number, offset: number): string {
    let isAfternoon = false
    let time = "12:00"

    if (count > 11) {
        count = count - 12
        isAfternoon = true
    }

    if (count != 0) {
        time = `${count}:00`
    }

    time += isAfternoon ? " PM" : " AM"

    return time
}