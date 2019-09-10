import React, { PureComponent } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { sortBy, groupBy, flatten } from "lodash";
import { legApiKey } from "./constants";

const legApiUrl = `https://legislation.nysenate.gov/api/3/bills/2019?sort=signed:DESC&limit=1000&key=${legApiKey}`;

class BillView extends PureComponent {
  constructor() {
    super();
    this.state = {
      bills: [],
      legApiUrl: legApiUrl
    };
    this.fetchBills = this.fetchBills.bind(this);
    this.addBills = this.addBills.bind(this);
  }

  componentDidMount() {
    this.fetchBills(this.state.legApiUrl);
    console.log(legApiKey)
  }

  addBills(result) {
    result = result.filter(bill => bill.billType.chamber === "SENATE" && bill.billType.resolution === false && bill.status.statusType === "SIGNED_BY_GOV")
    this.setState({
      bills: [].concat.apply([], [...this.state.bills, result])
    });
    if (result.offsetEnd !== result.total) {
       this.fetchBills(this.state.legApiUrl + `offset=${result.offsetEnd}`);
     }
    console.log(this.state.bills)
  }

  fetchBills(link) {
    fetch(link)
      .then(response => response.json())
      .then(result => this.addBills(result.result.items));
  }


  render() {
    return null
  }
}


export default BillView;
