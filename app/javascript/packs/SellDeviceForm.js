// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Select from 'react-select'

class SellForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      model: "",
      modelOptions: [
        { value: 'iphone5', label: 'iPhone 6' },
        { value: 'iphone5s', label: 'iPhone 5s' },
        { value: 'iphone6', label: 'iPhone 6' },
        { value: 'iphone6s', label: 'iPhone 6s' },
        { value: 'iphone6+s', label: 'iPhone 6+s' },
        { value: 'iphone7', label: 'iPhone 7' },
        { value: 'iphone7+', label: 'iPhone 7+' },
        { value: 'iphone8', label: 'iPhone 8' },
        { value: 'iphone8+', label: 'iPhone 8+' },
        { value: 'iphonex', label: 'iPhone X' },
        { value: 'iphonexr', label: 'iPhone XR' },
        { value: 'galaxys6', label: 'Galaxy S6' },
        { value: 'galaxys7', label: 'Galaxy S7' },
        { value: 'galaxys7edge', label: 'Galaxy S7 edge' },
        { value: 'galaxys8', label: 'Galaxy S8' },
        { value: 'galaxys9', label: 'Galaxy S9' },
        { value: 'galaxys10', label: 'Galaxy S10' },
        { value: 'galaxys20', label: 'Galaxy S20' },
      ],
      manufacturer: "",
      manufacturerOption: [
        { value: 'apple', label: 'Apple' },
        { value: 'samsung', label: 'Samsung' },
      ],
      color: "",
      colorOptions: [
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'red', label: 'Other' },
      ],
      storage: "",
      storageOptions: [
        { value: '8', label: '8 GB' },
        { value: '16', label: '16 GB' },
        { value: '32', label: '32 GB' },
        { value: '64', label: '64 GB' },
        { value: '128', label: '128 GB' },
      ],
      condition: "",
      conditionOptions: [
        { value: "1.0", label: 'Perfect' },
        { value: "0.8", label: 'Good' },
        { value: "0.6", label: 'Normal Usage' },
        { value: "0.4", label: 'heavy Usage' },
        { value: "0.2", label: 'Unusable' },
      ],
      previousRepairs: [],
      repairOptions: [
        { value: 'screen', label: 'Screen' },
        { value: 'battery', label: 'Battery' },
        { value: 'backside', label: 'Backside' },
        { value: 'charging port', label: 'Charging Port' },
        { value: 'other', label: 'Other' },
      ],
      operatorLocked: false,
      cloudLocked: false,
      estimated_price: 0,
      ledger: [
        {title: "1. Estimate Price", description: "Provide device information", step: 1},
        {title: "2. Generate Waybil", description: "Slap it on a post box and send it over.", step: 2},
        {title: "3. Get Money", description: "3-5 works days after receival your money is in the bank.", step: 3}
      ],
      formStep: 1
    };
  }

  handleChange = (event) => {
    const key = event.target.id;
    this.setState({ [key]: event.target.value });
    this.calcPrice();
  }

  handlePreviousRepairChange = event => {
    let prevRep = this.state.previousRepairs;
    if (!prevRep.includes(event.target.value)) {
      prevRep.push(event.target.value);
      console.log('New element added', prevRep);
    }
    this.setState({ previousRepairs: prevRep });
  }

  handleSubmit = event => {
    const { formStep } = this.state;
    console.log('formstep', formstep, this.state.formstep, this.state)
    this.setState({ formStep: formStep + 1 })
  }

  calcPrice = () => {
    const { model, manufacturer, storage, condition, previousRepairs } = this.state;
    // model && brand && storage && condition && previousRepairs
    console.log(model, manufacturer, storage, condition);

    if (model !== "" && manufacturer !== "" && storage !== "" && condition !== "") {
      // TODO: Call api instead
      const conditionFactor = parseInt(condition) / 3;
      const prevRepairFactor = 1 / (previousRepairs.length + 1);
      const storageFactor = parseInt(storage) / 16;
      let price = 0;
      if (manufacturer.toLowerCase() < "apple") {
        if (model.toLowerCase().includes("iphone")) {
          price += 200;
        } else if (model.toLowerCase().includes("ipad")) {
          price += 250;
        }
      } else if (manufacturer.toLowerCase() < "samsung") {
        if (model.toLowerCase().includes("s7") || model.toLowerCase().includes("s8")) {
          price += 300;
        } else if (model.toLowerCase().includes("s9") || model.toLowerCase().includes("s10")) {
          price += 700;
        }
      }
      price += 1400 * storageFactor * conditionFactor * prevRepairFactor;
      price = Math.round(price - price % 25);
      this.setState({ estimated_price: price });
    } else {
      this.setState({ estimated_price: "..give me some more information please..." });

    }
  }

  styleStep = (currStepNr, stepNr) => {
    let style = "list-group-item d-flex justify-content-between lh-condensed";
    style += currStepNr == stepNr ? " bg-light" : "";
    style += currStepNr > stepNr ? " text-success" : "";
    return style;
  }

  renderLedger = () => {
    const { formStep, ledger } = this.state;
    let stepDone = <li className="list-group-item d-flex justify-content-center">
      <span class="text-center text-success">Done</span>
    </li>;

    return (
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span>Steps</span>
        </h4>
        <ul className="list-group mb-3">
          {ledger.map( stepObj =>  
          <li key={stepObj.step} className={this.styleStep(formStep, stepObj.step)}>
            <div>
              <h6 className="my-0">{stepObj.title}</h6>
              <small className="text-muted">{stepObj.description}</small>
            </div>
          </li>)}

          {formStep > 3 ? stepDone : null}
        </ul>
      </div>
    );
  }

  render() {
    const { modelOptions,
      manufacturerOption,
      colorOptions,
      storageOptions,
      conditionOptions,
      repairOptions } = this.state;

    return (
      <div className="row">
        <div className="col-md-8">
          <h4 className="mb-3">Estimate Price</h4>
          <form className="needs-validation" noValidate=""
            onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="model">Model*</label>
                <Select options={modelOptions} />
                <div className="invalid-feedback">
                  Valid model is required.
          </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="manufacturer">Manufacturer*</label>
                <Select options={manufacturerOption} />
                <div className="invalid-feedback">
                  Valid Manufacturer is required.
          </div>
              </div>
            </div>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label htmlFor="condition">Condition*</label>
                <Select options={conditionOptions} />
                <div className="invalid-feedback">
                  Please select a valid condition.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="storage">Internal Storage*</label>
                <Select options={storageOptions} />
                <div className="invalid-feedback">
                  Please provide a valid internal storage.
          </div>
              </div>
            </div>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label htmlFor="color">Color</label>
                <Select options={colorOptions} />
                <div className="invalid-feedback">
                  Please select a valid color.
                   </div>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="previousRepairs">Previous Repairs</label>
                <Select isMulti options={repairOptions} />
                <div className="invalid-feedback">
                  Please select a valid condition.
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" onChange={this.handleChange}
                    id="operatorLocked" />
                  <label className="custom-control-label" htmlFor="operatorLocked">Operator Locked</label>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" onChange={this.handleChange} id="cloudLocked" />
                  <label className="custom-control-label" htmlFor="cloudLocked">iCloud Locked</label>
                </div>
              </div>
            </div>
            <hr className="mb-4" />
            <h5 className="mb-3">Your estimated price: {this.state.estimated_price} SEK </h5>
            <button className="btn btn-primary btn-lg btn-block">Next</button>
          </form>
        </div>
        {this.renderLedger()}
      </div>);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SellForm />,
    document.getElementById('react-container').appendChild(document.createElement('div')),
  )
})



