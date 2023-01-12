import moment from "moment"
import { useState } from "react"

export default function Autocomplete() {
    const [isSelected, setIsSelected] = useState(false)
    const [options, setOptions] = useState([] as any[])


    const updateOptions = (fieldInput: string) => {
        const timezones: string[] = moment.tz.names();
        const timezonesSelection: any[] = []

        let count = 0;

        timezones.forEach((timezone) => {
            if (timezone.toLowerCase().includes(fieldInput.toLowerCase()) && count < 7) {
                timezonesSelection.push(
                    <li key={timezone}>{timezone}</li>
                )
                count += 1
            }
        })

        setOptions(timezonesSelection)
    }
    
    return (
        <div className="grid grid-cols-1">
            <label className="label">
                <span className="label-text">Timezone</span>
            </label>
            <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                onFocus={() => setIsSelected(true)}
                onBlur={() => setIsSelected(false)}
                onChange={(event) => {updateOptions(event.target.value)}}/>
            <div className={`dropdown ${isSelected ? "dropdown-open": ""}`}>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    { options }
                </ul>
            </div>
        </div>
    )
}