import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Person from "./person";
import { sortBy, groupBy, flatten } from "lodash";
import { legendCategories, toolsApiKey } from "./constants";

const toolsApiUrl = `https://tools.advocacy-institute.org/api/v1/people?reason=Elected&government_body=Senate&page=1&api_key=${toolsApiKey}`;

class SenateView extends Component {
  constructor() {
    super();
    this.state = {
      senators: [],
      toolsApiUrl: toolsApiUrl
    };

    this.fetchSenators = this.fetchSenators.bind(this);
    this.addSenators = this.addSenators.bind(this);
  }

  componentDidMount() {
    this.fetchSenators(this.state.toolsApiUrl);
  }

  addSenators(result) {
    this.setState({
      senators: [].concat.apply([], [...this.state.senators, result.data])
    });
    if (result.links.next) {
      this.fetchSenators(result.links.next);
    }
  }

  fetchSenators(link) {
    fetch(link)
      .then(response => response.json())
      .then(result => this.addSenators(result));
  }

  sortByRaceAndName(people) {
    let sortedPeople = [];
    const byRace = sortBy(people, function(person) {
      return person.attributes.race;
    });
    const group = groupBy(byRace, function(person) {
      return person.attributes.race;
    });

    Object.keys(group).forEach(key => {
      sortedPeople.push(sortBy(group[key], "attributes.last_name"));
    });
    return flatten(sortedPeople);
  }

  getClasses(value) {
    return `legend-circle ${value}`;
  }

  getLegendCount({ people, party, category, value }) {
    const peopleByParty = people.filter(person => {
      return person.attributes.party[0].split(";")[0] === party;
    });

    const filteredPeople = peopleByParty.filter(person => {
      if (person.attributes[category]) {
        return person.attributes[category][0] === value;
      } else {
        return peopleByParty;
      }
    });

    return filteredPeople.length;
  }

  renderLegend({ legendCategories, people, title }) {
    return legendCategories.map((category, i) => {
      return (
        <div key={category.id} className="legend-lbl">
          <div className="legend-color">
            <div className={this.getClasses(category.id)} />
          </div>
          <div className="lblname">
            {`${category.label} ${category.party} ${title} `} (
            {this.getLegendCount({
              people: people,
              party: category.party,
              category: "race",
              value: category.race
            })}
            )
          </div>
        </div>
      );
    });
  }

  renderSenators() {
    if (this.state.senators.length > 0) {
      let senators = this.state.senators;
      let democraticConference = senators.filter(person =>
        person.attributes.legislative_conference.includes(
          "Democratic Conference"
        )
      );

      let republicanConference = senators.filter(person =>
        person.attributes.legislative_conference.includes(
          "Republican Conference"
        )
      );
      let vacancies = 63 - this.state.senators.length
      return (
        <Container>
          <Row>
            <Col id="senate-dem" key="Democratic" sm={12} md={12} lg={6}>
              <Row>
                <div className="senator-buttons">
                  {this.sortByRaceAndName(democraticConference).map(
                    (senator, i) => (
                      <Person key={i} info={senator} />
                    )
                  )}
                </div>
              </Row>
              <Row className="conference-detail-data">
                <div className="conference-detail-title">
                  <div>
                    Democratic:
                    <span style={{ fontWeight: "bold" }}>
                      {" " + democraticConference.length}
                    </span>
                  </div>
                </div>
              </Row>
            </Col>
            <Col id="senate-repub" sm={12} md={6} lg={6}>
              <Row>
                <div className="senator-buttons">
                  {republicanConference.map((senator, i) => (
                    <Person key={i} info={senator} />
                  ))}
                </div>
              </Row>
              <Row className="conference-detail-data">
                <div className="conference-detail-title">
                  <div>
                    Republican:
                    <span style={{ fontWeight: "bold" }}>
                      {" " + republicanConference.length}
                    </span>
                  </div>
                </div>
              </Row>
            </Col>
            <Col id="senate-vacancy" key="Vacancy" sm={12} md={12} lg={6}>
                  <p>There are {vacancies} vacancies currently.</p>
              <Row className="conference-detail-data">
                <div className="conference-detail-title">
                  <div>
                    Vacant Seats:
                    <span style={{ fontWeight: "bold" }}>
                      {" " + vacancies}
                    </span>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <div className="legend">
              <div id="legend-title">Legend</div>
              {this.renderLegend({
                legendCategories: legendCategories,
                people: this.state.senators,
                title: "Conference Senators"
              })}
            </div>
          </Row>
        </Container>
      );
    }
  }

  render() {
    return <div className="senate-container">{this.renderSenators()}</div>;
  }
}

export default SenateView;
