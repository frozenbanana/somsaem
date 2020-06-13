import React from 'react';
import Select from 'react-select';
import FormLedger from './FormLedger';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


export class DeviceDetailsForm extends React.Component {
    constructor(props) {
        super(props);
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { fieldKeys, values } = this.props;
        console.log(values.yesNoQuestions);
        const { handleCheckboxChange, handleSelectionChange, nextStep } = this.props;
        const { ledger, styleStep } = this.props;
        return (
        <div className="row">
            <div className="col-md-8">
                <h4 className="mb-3">Estimate Price</h4>
                <form className="needs-validation" noValidate=""
                    onSubmit={nextStep}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor={fieldKeys[0]}>Model</label>
                            <Select autoFocus onChange={e => handleSelectionChange(fieldKeys[0], e)} options={values.modelOptions} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor={fieldKeys[1]}>Internal Storage</label>
                            <Select onChange={e => handleSelectionChange(fieldKeys[1], e)} options={values.storageOptions} />
                        </div>
                    </div>

                    <div className="row">
                        
                        <div className="col-md-6 mb-3">
                            <label htmlFor={fieldKeys[4]}>{values.wearLevel.label}</label>
                            <Select onChange={e => handleSelectionChange(fieldKeys[2], e)} options={values.wearLevelOptions} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor={fieldKeys[3]}>Previous Repairs</label>
                            <Select onChange={e => handleSelectionChange(fieldKeys[3], e)} isMulti options={values.repairOptions} />
                        </div>
                    </div>

                   
                    <hr className="mb-4" />
                    {values.yesNoQuestions.map(q => {
                        return (
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    {q.label}
                                </div>
                                <div className="col-md-6 mb-3 text-center">
                                    <BootstrapSwitchButton
                                        onstyle="secondary"
                                        checked={q.value}
                                        onlabel='Yes'
                                        offlabel='No'
                                        onChange={checked => handleCheckboxChange(q.key, checked)}
                                        id={q.key}
                                    />
                                </div>
                            </div>)
                    })}

                    <hr className="mb-4" />
                    <h5 className="mb-3">Your estimated price: {values.estimatedPrice} SEK </h5>
                    <button className="btn btn-primary btn-lg btn-block" type="button" onClick={nextStep}>Next</button>
                </form>
            </div>
            <FormLedger formStep={values.formStep} ledger={ledger} styleStep={styleStep} />
        </div >);
    }
}

export default DeviceDetailsForm;