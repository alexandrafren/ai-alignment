import React, { PureComponent } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { sortBy, groupBy, flatten } from "lodash";
import { legendCategories } from "./constants";

class Legend extends PureComponent {

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

  renderLegend() {
    return legendCategories.map((category, i) => {
      return (
        <div key={category.id} className="legend-lbl">
          <div className="legend-color">
            <div className={this.getClasses(category.id)} />
          </div>
          <div className="lblname">
            {`${category.label} ${category.party} Conference Senators`} (
            {this.getLegendCount({
              people: this.props.people,
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

  render() {
    return(
        <Container>
        <Row>
          <div className="legend">
            <div id="legend-title">Legend</div>
            {this.renderLegend()}
          </div>
        </Row>
      </Container>
    );
  }
}

export default Legend;
