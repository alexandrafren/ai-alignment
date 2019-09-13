import React, { PureComponent } from "react";
import { legApiKey } from "./constants";
import SenateView from './senateView'

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
    this.fetchBills(this.state.legApiUrl)
  }

  addBills(result) {
    let manipulateResult = result.result.items.filter(bill => bill.billType.chamber === "SENATE" && bill.billType.resolution === false && bill.status.statusType === "SIGNED_BY_GOV")
    this.setState({
      bills: [].concat.apply([], [...this.state.bills, manipulateResult])
    });
    if (result.offsetEnd !== result.total) {
       this.fetchBills(this.state.legApiUrl + `&offset=${result.offsetEnd}`);
     }
  }

  fetchBills(link) {
    fetch(link)
      .then(response => response.json())
      .then(result => this.addBills(result));
  }

  render() {
    return (<SenateView bills={this.state.bills}/>)
  }
}

export default BillView;