import React from 'react';
import DeviceDetailsForm from './DeviceDetailsForm';

class SellDeviceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // Form 1
      model: null,
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
      manufacturer: null,
      manufacturerOption: [
        { value: 'apple', label: 'Apple' },
        { value: 'samsung', label: 'Samsung' },
      ],
      color: null,
      colorOptions: [
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'red', label: 'Other' },
      ],
      storage: null,
      storageOptions: [
        { value: '8', label: '8 GB' },
        { value: '16', label: '16 GB' },
        { value: '32', label: '32 GB' },
        { value: '64', label: '64 GB' },
        { value: '128', label: '128 GB' },
      ],
      condition: null,
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
      estimatedPrice: 0,
      // Form 2
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",

      ledger: [
        { title: "1. Estimate Price", description: "Provide device information", step: 1 },
        { title: "2. Generate Waybil", description: "Slap it on a post box and send it over.", step: 2 },
        { title: "3. Get Money", description: "3-5 works days after receival your money is in the bank.", step: 3 }
      ],
      formStep: 1
    };
  }

  handleCheckboxChange = (event) => {
    const key = event.target.id;
    this.setState({ [key]: !this.state[key] }, () => this.calcPrice());
  }

  handleSelectionChange = (key, selectedOption) => {
    console.log(key, selectedOption);
    if (Array.isArray(selectedOption)) {
      this.setState({ [key]: selectedOption.map(el => el.value) }, () => this.calcPrice());
    } else if (selectedOption) {
      this.setState({ [key]: selectedOption.value }, () => this.calcPrice());
    } else {
      this.setState({ [key]: null }, () => () => this.calcPrice());
    }
  }

  nextStep = (event) => {
    const { formStep } = this.state;
    this.setState({ formStep: formStep + 1 })
  }

  prevStep = (event) => {
    const { formStep } = this.state;
    this.setState({ formStep: formStep - 1 })
  }

  calcPrice = () => {
    const { model, manufacturer, storage, condition, previousRepairs, operatorLocked, cloudLocked } = this.state;

    if (model && manufacturer && storage && condition) {
      // TODO: Call api instead
      const conditionFactor = parseFloat(condition);
      let repairLen = 0;
      if (previousRepairs.length) {
        repairLen = previousRepairs.length;
      }
      const prevRepairFactor = 1 / (repairLen + 1);
      const storageFactor = parseInt(storage) / 64;
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
      price += 1600 * storageFactor * conditionFactor * prevRepairFactor;
      price = Math.round(price - price % 25);
      price = operatorLocked || cloudLocked ? price * 0.25 : price;
      this.setState({ estimatedPrice: price });
    } else {
      this.setState({ estimatedPrice: "More information please..." });

    }
  }

  styleStep = (currStepNr, stepNr) => {
    let style = "list-group-item d-flex justify-content-between lh-condensed";
    style += currStepNr == stepNr ? " bg-light" : "";
    style += currStepNr > stepNr ? " text-success" : "";
    return style;
  }

  render() {
    const { modelOptions,
      manufacturerOption,
      colorOptions,
      storageOptions,
      conditionOptions,
      repairOptions,
      estimatedPrice,
      formStep,
      ledger } = this.state;

    const values = {
      modelOptions,
      manufacturerOption,
      colorOptions,
      storageOptions,
      conditionOptions,
      repairOptions,
      estimatedPrice,
      formStep,
    };

    const fieldKeys = ['model', 'manufacturer', 'condition', 'storage', 'color', 'previousRepairs'];

    switch (formStep) {
      case 1:
        return (<DeviceDetailsForm
          nextStep={this.nextStep}
          handleSelectionChange={this.handleSelectionChange}
          handleCheckboxChange={this.handleCheckboxChange}
          styleStep={this.styleStep}
          ledger={ledger}
          values={values}
          fieldKeys={fieldKeys} />);
      case 2:
        return "Form 2"
      case 3:
        return "Form 3"
    }
  }
}

export default SellDeviceForm;