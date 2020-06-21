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
    fetchSearchResults = (query) => {
        // const params = {
        //     search: query,
        // };

        // let query = Object.keys(params)
        //     .map(
        //         (k) =>
        //             encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
        //     )
        //     .join("&");

        const searchUrl = "http://localhost:3000/repairables?search";


        // By default the limit of results is 20
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

    getRepairablesFromApi = (baseUrl, query) => {
        let url = baseUrl;
        if (query) {
            console.log('params:', encodeURIComponent('search') + "=" + encodeURIComponent(query));
            url += "?"+encodeURIComponent('search') + "=" + encodeURIComponent(query);
        }
        // url += ".json";
        console.log('fetching from', url, 'query:', query);
        fetch(url).then((resp) => {
            if (resp.ok) {
                resp.json().then((products) => {
                    console.log("Result: ", products);
                    this.setState({ results: products });
                });
            }
        });
    }

    componentDidMount() {
        this.getRepairablesFromApi("http://localhost:3000/repairables");
        // fetch("http://localhost:3000/repairables.json").then((resp) => {
        //     if (resp.ok) {
        //         resp.json().then((products) => {
        //             console.log("Result: ", products);
        //             this.setState({ results: products });
        //         });
        //     }
        // });
    }

    handleChange = (selectedOption) => {
        console.log("selected", selectedOption);
        this.setState({ query: selectedOption.value }, () => { 
            console.log('query:', this.state.query);
            this.getRepairablesFromApi("http://localhost:3000/repairables", this.state.query);
            }
        );
    };

    renderSearchResults = () => {
        const { results } = this.state;
        const imgStyle = {height: '225px', width: '100%', display: 'block'}
        console.log('trying to render result', results);
        if (Object.keys(results).length && results.length) {
            return (
                <div className="row justify-content-between align-items-center">
                    {results.map((product) => {
                        return (
                            <div className="card mb-4 box-shadow">
                                <img className="card-img-top" 
                                data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                                alt="Thumbnail [100%x225]" 
                                style={imgStyle}
                                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1728a7d1574%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1728a7d1574%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.7109375%22%20y%3D%22120.15%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                                data-holder-rendered="true"/>
                                <div className="card-body">
                                    <p className="card-text"> {product.name} </p>
                                </div>
                            </div>
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
                <br/>
                {this.renderSearchResults()}
            </div>
        );
    }
}
export default RepairDeviceForm;
