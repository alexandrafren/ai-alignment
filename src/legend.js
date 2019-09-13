import React, { PureComponent } from "react";
import { Row, Container } from "react-bootstrap";
import { legendCategories } from "./constants";

class Legend extends PureComponent {

  getClasses(value) {
    return `legend-circle ${value}`;
  }

  getLegendCount({ people, party, category, value }) {
    let filteredPeople = [];
    if (category === "race"){
      const peopleByParty = people.filter(person => {
        return person.attributes.party[0].split(";")[0] === party;
      });
  
       filteredPeople = peopleByParty.filter(person => {
        if (person.attributes[category]) {
          return person.attributes[category][0] === value;
        } else {
          return peopleByParty;
        }
      });
    }
    else {
      filteredPeople = people.filter(person => {
        if (person.attributes[category]){
          return person.attributes[category][0] === "Yes"
        }
      })
    }
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
              category: category.category,
              value: category.race
            })}
            )
          </div>
        </div>
      );
    });
    return(
    <div className="legend-circle">
    Senate Leadership
    </div>)
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
