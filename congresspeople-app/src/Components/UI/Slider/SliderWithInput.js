import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
/* eslint react/prop-types: 0 */

const SliderWithInput = ({maxVotes, minVotes, onSliderSelect, value}) => {
    const onSliderSelection = (event) => {
        onSliderSelect(event.value);
    }
    return (
        <div className="grid">
            <div className="col-12">
                <div className="p-inputgroup mt-3">
                            <span className="p-inputgroup-addon w-2 bg-green-400">
                                <i className="pi pi-filter-fill"></i>
                            </span>
                    <span className="p-float-label">
                                <InputNumber inputId="inputnumber" value={value} onChange={onSliderSelection}/>
                            <label htmlFor="inputnumber">Total Votes</label>
                            </span>
                </div>
            </div>
            <div className="col-12">
                <Slider value={value} min={minVotes} max={maxVotes} onChange={onSliderSelection}/>
            </div>
        </div>
    );
};
export default SliderWithInput;

