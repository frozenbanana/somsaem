import React from "react";
import Select from "react-select";
import axios from "axios";

class RepairDeviceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            options: [
                { value: "iphone 5", label: "iPhone 5" },
                { value: "iphone 5s", label: "iPhone 5s" },
                { value: "iphone 6", label: "iPhone 6" },
                { value: "iphone 6s", label: "iPhone 6s" },
                { value: "iphone 6splus", label: "iPhone 6+s" },
                { value: "iPhone 7", label: "iPhone 7" },
                { value: "iphone 7plus", label: "iPhone 7+" },
                { value: "iPhone 8", label: "iPhone 8" },
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
            results: {},
            loading: false,
            message: "",
        };
    }

    /**
     * Fetch the search results and update the state with the result.
     *
     * @param {int} updatedPageNo Updated Page No.
     * @param {String} query Search Query.
     *
     */
    fetchSearchResults = (updatedPageNo = "", query) => {
        console.log("Starting fetchSearchResult..");
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
        // By default the limit of results is 20
        const searchUrl = `http://localhost:3000/search/index?search_index%5Bquery%5D=${query}`;
        console.log(`Starting fetchSearchResult with url: ${searchUrl}`);
        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();
        axios
            .get(searchUrl, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                const resultNotFoundMsg = !res.data.hits.length
                    ? "There are no more search results. Please try a new search."
                    : "";
                console.log("result: ", res.data.hits);
                this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    loading: false,
                });
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    console.log("Error fetchSearchResult..", error);

                    this.setState({
                        loading: false,
                        message:
                            "Failed to fetch results. Please check network",
                    });
                }
            });
    };
    componentDidMount() {
        fetch("http://localhost:3000/products.json").then((resp) => {
            if (resp.ok) {
                resp.json().then((products) => {
                    console.log("Result: ", products);
                    this.setState({ result: products });
                });
            }
        });
    }

    handleChange = (selectedOption) => {
        console.log("selected", selectedOption);
        this.setState({ query: selectedOption.value }, () =>
            console.log(`Option selected:`, this.state)
        );
    };

    renderSearchResults = () => {
        const { results } = this.state;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((product) => {
                        return (
                            <a
                                key={product.id}
                                href={product.previewURL}
                                className="result-items"
                            >
                                <div className="image-wrapper">
                                    <img
                                        className="image"
                                        src={product.previewURL}
                                        alt={product.model}
                                    />
                                </div>
                                {product.model}
                            </a>
                        );
                    })}
                </div>
            );
        }
    };

    render() {
        const { query, options } = this.state;
        console.log("This is query", query);
        return (
            <div className="container">
                {/*Heading*/}
                <h2 className="heading">Search Device to Repair</h2>
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <i className="fa fa-search search-icon" />
                </label>
                <Select
                    autoFocus
                    key="repairDeviceSearch"
                    onChange={this.handleChange}
                    options={options}
                />
                {/*Result*/}
                {this.renderSearchResults()}
            </div>
        );
    }
}
export default RepairDeviceForm;
