import moment from "moment"
import { useState } from "react"

export default function Autocomplete({ title, setValue } : { title: string, setValue: any}) {
    const [isSelected, setIsSelected] = useState(false)
    const [options, setOptions] = useState([] as any[])
    const [selectedOption, setSelectedOption] = useState("")
    const [fieldValue, setFieldValue] = useState("")

    const updateOptions = (fieldInput: string) => {
        const timezones: string[] = moment.tz.names();
        const timezonesSelection: any[] = []

        let count = 0;

        timezones.forEach((timezone) => {
            if ((timezone.toLowerCase().includes(fieldInput.toLowerCase())
                || timezone.toLowerCase().replaceAll("_", " ").includes(fieldInput.toLowerCase()))
                && count < 7) {
                timezonesSelection.push(
                    <li
                        key={timezone}
                        onMouseDown={() => {
                        setValue(timezone)
                        setSelectedOption(timezone)
                        setFieldValue(timezone)}}>
                            <a>{timezone}</a>
                    </li>
                )
                count += 1
            }
        })

        if (timezonesSelection.length === 0) {
            timezonesSelection.push(<li>No timezones found</li>)
        }

        setOptions(timezonesSelection)
    }
    
    return (
        <div className="grid grid-cols-1">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <input
                alt="timezone selection"
                className="input input-bordered w-full"
                type="text"
                value={fieldValue}
                onFocus={() => setIsSelected(true)}
                onChange={(event) => {
                    setFieldValue(event.target.value)
                    updateOptions(event.target.value)}}
                onBlur={() => {
                    setIsSelected(false)}}/>
            <div className={`dropdown ${isSelected && options.length > 0 ? "dropdown-open": ""} pt-2`}>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 bg-base-200 w-80">
                    { options }
                </ul>
            </div>
        </div>
    )
}