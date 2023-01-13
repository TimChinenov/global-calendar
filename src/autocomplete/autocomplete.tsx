import moment from "moment"
import { useState } from "react"

export default function Autocomplete({ title, setValue } : { title: string, setValue: any}) {
    const [isSelected, setIsSelected] = useState(false)
    const [options, setOptions] = useState([] as any[])
    const [selectedOption, setSelectedOption] = useState("")

    const updateOptions = (fieldInput: string) => {
        const timezones: string[] = moment.tz.names();
        const timezonesSelection: any[] = []

        let count = 0;

        timezones.forEach((timezone) => {
            if (timezone.toLowerCase().includes(fieldInput.toLowerCase()) && count < 7) {
                timezonesSelection.push(
                    <li
                        key={timezone} onClick={() => {
                        setValue(timezone)
                        setSelectedOption(timezone)
                        setIsSelected(false)}
                    }><a>{timezone}</a></li>
                )
                count += 1
            }
        })

        setOptions(timezonesSelection)
    }
    
    return (
        <div className="grid grid-cols-1">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <input
                className="input input-bordered w-full md:max-w-xs"
                type="text"
                value={selectedOption}
                onFocus={() => setIsSelected(true)}
                onBlur={() => setIsSelected(false)}
                onChange={(event) => {
                    setSelectedOption(event.target.value)
                    updateOptions(event.target.value)}}/>
            <div className={`dropdown ${isSelected && options.length > 0 ? "dropdown-open": ""} pt-2`}>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 bg-base-200 w-80">
                    { options }
                </ul>
            </div>
        </div>
    )
}