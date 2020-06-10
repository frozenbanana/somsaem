import React from 'react';
import Select from 'react-select';
import FormLedger from './FormLedger';

export class DeviceDetailsForm extends React.Component {
    constructor(props) {
        super(props);
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const {fieldKeys,values} = this.props;
        const {handleCheckboxChange,handleSelectionChange, nextStep } = this.props;
        const {ledger, styleStep } = this.props;
        console.log('ledger:' , ledger);
        return (<div className="row">
        <div className="col-md-8">
          <h4 className="mb-3">Estimate Price</h4>
          <form className="needs-validation" noValidate=""
            onSubmit={nextStep}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="model">Model*</label>
                <Select autoFocus onChange={e => handleSelectionChange(fieldKeys[0], e)} options={values.modelOptions} />
                <div className="invalid-feedback">
                  Valid model is required.
          </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="manufacturer">Manufacturer*</label>
                <Select onChange={e => handleSelectionChange(fieldKeys[1], e)} options={values.manufacturerOption} />
                <div className="invalid-feedback">
                  Valid Manufacturer is required.
          </div>
              </div>
            </div>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label htmlFor="condition">Condition*</label>
                <Select onChange={e => handleSelectionChange(fieldKeys[2], e)} options={values.conditionOptions} />
                <div className="invalid-feedback">
                  Please select a valid condition.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="storage">Internal Storage*</label>
                <Select  onChange={e => handleSelectionChange(fieldKeys[3], e)} options={values.storageOptions} />
                <div className="invalid-feedback">
                  Please provide a valid internal storage.
          </div>
              </div>
            </div>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label htmlFor="color">Color</label>
                <Select onChange={e => handleSelectionChange(fieldKeys[4], e)} options={values.colorOptions} />
                <div className="invalid-feedback">
                  Please select a valid color.
                   </div>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="previousRepairs">Previous Repairs</label>
                <Select onChange={e => handleSelectionChange(fieldKeys[5], e) } isMulti  options={values.repairOptions} />
                <div className="invalid-feedback">
                  Please select a valid condition.
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" onChange={handleCheckboxChange}
                    id="operatorLocked" />
                  <label className="custom-control-label" htmlFor="operatorLocked">Operator Locked</label>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" onChange={handleCheckboxChange} id="cloudLocked" />
                  <label className="custom-control-label" htmlFor="cloudLocked">iCloud Locked</label>
                </div>
              </div>
            </div>
            <hr className="mb-4" />
            <h5 className="mb-3">Your estimated price: {values.estimatedPrice} SEK </h5>
            <button className="btn btn-primary btn-lg btn-block" type="button" onClick={nextStep}>Next</button>
          </form>
        </div>
        <FormLedger formStep={values.formStep} ledger={ledger} styleStep={styleStep}/>
      </div>);
    }
}

export default DeviceDetailsForm;