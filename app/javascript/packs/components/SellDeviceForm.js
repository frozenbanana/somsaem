import React from "react";
import DeviceDetailsForm from "./DeviceDetailsForm";

class SellDeviceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            // Form 1
            model: {
                value: null,
                label: "Model",
                options: [
                    { value: "iphone5", label: "iPhone 6" },
                    { value: "iphone5s", label: "iPhone 5s" },
                    { value: "iphone6", label: "iPhone 6" },
                    { value: "iphone6s", label: "iPhone 6s" },
                    { value: "iphone6splus", label: "iPhone 6+s" },
                    { value: "iphone7", label: "iPhone 7" },
                    { value: "iphone7plus", label: "iPhone 7+" },
                    { value: "iphone8", label: "iPhone 8" },
                    { value: "iphone8plus", label: "iPhone 8+" },
                    { value: "iphonex", label: "iPhone X" },
                    { value: "iphonexr", label: "iPhone XR" },
                    { value: "galaxys6", label: "Galaxy S6" },
                    { value: "galaxys7", label: "Galaxy S7" },
                    { value: "galaxys7edge", label: "Galaxy S7 edge" },
                    { value: "galaxys8", label: "Galaxy S8" },
                    { value: "galaxys9", label: "Galaxy S9" },
                    { value: "galaxys10", label: "Galaxy S10" },
                    { value: "galaxys20", label: "Galaxy S20" },
                ],
            },
            color: {
                value: null,
                label: "Color",
                options: [
                    { value: "black", label: "Black" },
                    { value: "white", label: "White" },
                    { value: "red", label: "Other" },
                ],
            },
            storage: {
                value: null,
                label: "Internal Storage",
                options: [
                    { value: "8", label: "8 GB" },
                    { value: "16", label: "16 GB" },
                    { value: "32", label: "32 GB" },
                    { value: "64", label: "64 GB" },
                    { value: "128", label: "128 GB" },
                ],
            },
            previousRepairs: {
                value: [],
                label: "Previous Repairs",
                options: [
                    { value: "screen", label: "Screen" },
                    { value: "battery", label: "Battery" },
                    { value: "backside", label: "Backside" },
                    { value: "charging port", label: "Charging Port" },
                    { value: "other", label: "Other" },
                ],
            },
            wearLevel: {
                value: 0,
                label: "How many scratches or dents are visable?",
                options: [
                    { value: 0, label: "Nothing" },
                    { value: 1, label: "Barely Notisable" },
                    { value: 2, label: "Notisable" },
                    { value: 3, label: "Very Notiable" },
                ],
            },
            isServiceProviderLocked: {
                key: "isServiceProviderLocked",
                value: false,
                label: "Is the device locked to a service provider?",
            },
            isCloudLocked: {
                key: "isCloudLocked",
                value: false,
                label: "Is the device iCloud locked?",
            },
            hasBootupDefect: {
                key: "hasBootupDefect",
                value: false,
                label: "Has the device issues starting?",
            },
            hasScreenDefect: {
                key: "hasScreenDefect",
                value: false,
                label: "Has the device screen any defects?",
            },

            estimatedPrice: 0,
            // Form 2
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            adress: "",
            city: "",
            region: "",
            country: "",
            country: "",
            clearingNumber: "",
            accountNumber: "",
            // Form 3
            isResetted: false,
            isAcceptedTerms: false,
            ledger: [
                {
                    title: "1. Estimate Price",
                    description: "Provide device information",
                    step: 1,
                },
                {
                    title: "2. Your details",
                    description:
                        "So we can make a package label and give you money.",
                    step: 2,
                },
                {
                    title: "3. Confirm",
                    description:
                        "3-5 works days after receival your money is in the bank.",
                    step: 3,
                },
            ],
            formStep: 1,
        };
    }

    handleCheckboxChange = (key, checked) => {
        console.log(key, checked);
        let checkbox = this.state[key];
        checkbox.value = checked;
        this.setState({ [key]: checkbox }, () => this.calcPrice());
    };

    handleSelectionChange = (key, selectedOption) => {
        console.log(key, selectedOption);
        if (Array.isArray(selectedOption)) {
            this.setState({ [key]: selectedOption.map((el) => el.value) }, () =>
                this.calcPrice()
            );
        } else if (selectedOption) {
            console.log("selectedOption.value :", selectedOption.value);

            this.setState(
                { [key]: { ...this.state[key], value: selectedOption.value } },
                () => this.calcPrice()
            );
        } else {
            this.setState({ [key]: null }, () => () => this.calcPrice());
        }
    };

    nextStep = (event) => {
        const { formStep } = this.state;
        this.setState({ formStep: formStep + 1 });
    };

    prevStep = (event) => {
        const { formStep } = this.state;
        this.setState({ formStep: formStep - 1 });
    };

    calcPrice = () => {
        const { model, storage, previousRepairs, isCloudLocked } = this.state;
        console.log("that the sheiet", model);
        const params = {
            model: model.value,
        };

        let query = Object.keys(params)
            .map(
                (k) =>
                    encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
            )
            .join("&");

        let url = "http://localhost:3000/products/estimate_price?" + query;
        console.log("that the sheiet", url);

        fetch(url)
            .then((resp) => {
                console.log("response: ", resp);

                if (resp.ok) {
                    resp.json().then((json) => {
                        console.log("json", json);
                        this.setState({ estimatedPrice: json.basePrice });
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // if (model && storage) {
        //     // TODO: Call api instead
        //     let repairLen = 0;
        //     if (previousRepairs.value.length) {
        //         repairLen = previousRepairs.value.length;
        //     }
        //     const prevRepairFactor = 1 / (repairLen + 1);
        //     const storageFactor = parseInt(storage) / 64;
        //     let price = 0;
        //     price += 200;
        //     if (model.toLowerCase().includes("ipad")) {
        //         price += 250;
        //     } else if (
        //         model.toLowerCase().includes("s7") ||
        //         model.toLowerCase().includes("s8")
        //     ) {
        //         price += 300;
        //     } else if (
        //         model.toLowerCase().includes("s9") ||
        //         model.toLowerCase().includes("s10")
        //     ) {
        //         price += 700;
        //     }
        //     price += 1600 * storageFactor * prevRepairFactor;
        //     price = Math.round(price - (price % 25));
        //     price =
        //         operatorLocked || isCloudLocked.value ? price * 0.25 : price;
    };

    styleStep = (currStepNr, stepNr) => {
        let style =
            "list-group-item d-flex justify-content-between lh-condensed";
        style += currStepNr == stepNr ? " bg-light" : "";
        style += currStepNr > stepNr ? " text-success" : "";
        return style;
    };

    render() {
        const {
            model,
            storage,
            wearLevel,
            previousRepairs,
            isServiceProviderLocked,
            isCloudLocked,
            hasBootupDefect,
            hasScreenDefect,
            estimatedPrice,
            formStep,
            ledger,
        } = this.state;

        const values = {
            rows: [
                { left: model, right: storage },
                { left: wearLevel, right: previousRepairs },
            ],
            yesNoQuestions: [
                isServiceProviderLocked,
                isCloudLocked,
                hasBootupDefect,
                hasScreenDefect,
            ],
            estimatedPrice,
            formStep,
        };

        const fieldKeys = ["model", "storage", "wearlevel", "previousRepairs"];

        switch (formStep) {
            case 1:
                return (
                    <DeviceDetailsForm
                        nextStep={this.nextStep}
                        handleSelectionChange={this.handleSelectionChange}
                        handleCheckboxChange={this.handleCheckboxChange}
                        styleStep={this.styleStep}
                        ledger={ledger}
                        values={values}
                        fieldKeys={fieldKeys}
                    />
                );
            case 2:
                return "Form 2";
            case 3:
                return "Form 3";
        }
    }
}

export default SellDeviceForm;
