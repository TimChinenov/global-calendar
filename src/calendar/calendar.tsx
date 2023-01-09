import { useState } from "react";

export default function Calendar() {

    const [boxStart, setBoxStart] = useState(0);
    const [length, setLength] = useState(0);

    let hourSections: any[] = []
    
    for(var count = 0; count < 25; count++) {
        const currentCount = count * 10
        hourSections.push(
        <div className="
            w-full
            h-24
            border-t-[1px] border-t-slate-50 border-b-slate-50">
                <div
                    className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300 border-t-[2px]"
                    onClick={() => {
                        setBoxStart(currentCount + 2)
                        setLength(2);
                    }}>
                        { (boxStart && boxStart == currentCount + 2) &&
                            <div
                                className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                style={{height: `${24*length}px`}}>
                            </div>
                        }
                </div>
                <div
                    className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300"
                    onClick={() => {
                        setBoxStart(currentCount + 4)
                        setLength(2);
                    }}>
                        { (boxStart && boxStart == currentCount + 4) &&
                            <div 
                                className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                style={{height: `${24*length}px`}}>
                            </div>
                        }
                </div>
                <div
                    className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300"
                    onClick={() => {
                        setBoxStart(currentCount + 6)
                        setLength(2);
                    }}>
                        { (boxStart && boxStart == currentCount + 6) &&
                            <div
                                className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                style={{height: `${24*length}px`}}>
                            </div>
                        }
                </div>
                <div
                    className="relative h-6 border-t-[1px] border-t-slate-500 border-b-slate-500 hover:border-t-red-300"
                    onClick={() => {
                        setBoxStart(currentCount + 8)
                        setLength(2);
                    }}>
                        { (boxStart && boxStart == currentCount + 8) &&
                            <div
                                className={`w-3/4 border-red-500 bg-cyan-500 absolute z-10 rounded mx-6`}
                                style={{height: `${24*length}px`}}>
                            </div>
                        }
                </div>
        </div>)
    }

    return (
        <div className="h-full w-full">
            <h2>time selected: { boxStart }</h2>
            <h2>length: { length }</h2>
            <div className="h-full w-full border-b-[1px]">
                { hourSections }
            </div>
        </div>
    )
}