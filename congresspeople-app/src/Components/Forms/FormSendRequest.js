import {useForm, Controller} from "react-hook-form";
import {classNames} from 'primereact/utils';
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {Accordion, AccordionTab} from "primereact/accordion";
/* eslint react/prop-types: 0 */

const FormSendRequest = ({onFormSubmit, congressSession, chamber, chambers}) => {
    const [openPanelConfig, setOpenPanelConfig] = useState(1);

    const defaultValues = {
        congress: congressSession,
        chamber
    };
    const form = useForm({defaultValues});
    const errors = form.formState.errors;


    const onSubmit = (data) => {
        setOpenPanelConfig(1);
        onFormSubmit(data);
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> :
            <small className="p-error">&nbsp;</small>;
    };

    return (
        <Accordion activeIndex={openPanelConfig} onTabChange={(e) => setOpenPanelConfig(e.index)}>
            <AccordionTab
                header={
                    <div className="flex align-items-center">
                        <span className="vertical-align-middle">Config Fetch data</span>
                        <i className="pi pi-cog ml-2 ml-2"></i>
                    </div>
                }
            >
                <div className="card flex flex-wrap gap-3 p-fluid">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                        <div className="flex-auto">
                            <Controller
                                name="congress"
                                control={form.control}
                                rules={{
                                    required: 'Enter a valid congress Session',
                                    validate: (value) => (value >= 80 && value <= 117) || 'Enter a valid congress Session (80-117)'
                                }}
                                render={({field, fieldState}) => (
                                    <>
                                        <label htmlFor={field.name} className="font-bold block mb-2">Congress
                                            session</label>
                                        <InputNumber inputId={field.name}
                                                     onBlur={field.onBlur}
                                                     value={field.value}
                                                     onValueChange={(e) =>
                                                         field.onChange(e)}
                                                     useGrouping={false}
                                                     showButtons
                                                     buttonLayout="horizontal"
                                                     step={1}
                                                     decrementButtonClassName="p-button-danger"
                                                     incrementButtonClassName="p-button-success"
                                                     incrementButtonIcon="pi pi-plus"
                                                     decrementButtonIcon="pi pi-minus"
                                                     inputClassName={classNames({'p-invalid': fieldState.error})}
                                        />
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex-auto">
                            <Controller
                                name="chamber"
                                control={form.control}
                                rules={{required: 'Chamber is required.'}}
                                render={({field, fieldState}) => (
                                    <>
                                        <label htmlFor="horizontal-buttons"
                                               className="font-bold block mb-2">Chamber</label>
                                        <Dropdown
                                            value={field.value}
                                            optionLabel="name"
                                            name="chamber"
                                            options={chambers}
                                            control={form.control}
                                            onChange={(e) => field.onChange(e.value)}
                                            className={classNames({'p-invalid': fieldState.error})}
                                        />
                                        {getFormErrorMessage('chamber')}
                                    </>

                                )}
                            />
                        </div>

                        <Button label="Save" type="submit" icon="pi pi-save"/>
                    </form>
                </div>

            </AccordionTab>
        </Accordion>
    )
}
export default FormSendRequest;