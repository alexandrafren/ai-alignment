import React, { Component } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.buttonHandler = this.buttonHandler.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.renderDistrictInfo = this.renderDistrictInfo.bind(this);
  }

  get setStyle() {
    let classes = `btn-circle ${this.props.info.attributes.race[0]
      .toLowerCase()
      .split("/")[0] +
      "-" +
      this.props.info.attributes.party[0].toLowerCase().split("; ")[0]}`;
    return classes;
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  buttonHandler(event) {
    event.preventDefault();
    this.open();
  }

  close() {
    this.setState({ showModal: false });
  }

  get renderTitleText() {
    if (this.props.info.attributes.leadership_title) {
      return (
        <div className="person-title-info">
          <div className="person-title-bold">
            {this.props.info.attributes.leadership_title}
          </div>
          <div className="person-title-bold">
            {this.props.info.attributes.title}
            <span className="unbold-text">
              {" "}
              since {this.props.info.attributes.year_first_elected}{" "}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="person-title-info">
          <div className="person-title-bold">
            {this.props.info.attributes.title}
            <span className="unbold-text">
              {" "}
              since {this.props.info.attributes.year_first_elected}{" "}
            </span>
          </div>
        </div>
      );
    }
  }

  renderDistrictInfo(title) {
    if (this.props.info.attributes.shapes[`${title.toLocaleLowerCase()}`][0]) {
      return (
        <div className="unbold-text">
          {title}:
          <span className="region-title">
            {` ${
              this.props.info.attributes.shapes[
                `${title.toLocaleLowerCase()}`
              ][0].title
            }`}
          </span>
        </div>
      );
    }
  }

  renderPhone(field) {
    let fieldSlug = field
      .replace(/ \//g, "")
      .replace(/ /g, "_")
      .toLowerCase();
    if (this.props.info.attributes[fieldSlug]) {
      return (
        <div className="modal-contact-lbl">
          {field.split(" ")[0] === "Phone" ? "Tel: " : "F: "}
          <span className="modal-bold">
            {this.props.info.attributes[fieldSlug].replace(
              /<\/?span[^>]*>/g,
              ""
            )}
          </span>
        </div>
      );
    }
  }

  renderAddress(field) {
    let fieldSlug = field
      .replace(/ \//g, "")
      .replace(/ /g, "_")
      .toLowerCase();
    if (this.props.info.attributes[fieldSlug]) {
      return (
        <div>
          <br />
          <a
            className="modal-bold"
            href={`https://maps.google.com/?q=${this.props.info.attributes[
              fieldSlug
            ].replace(/<\/?span[^>]*>/g, "")}`}
          >
            {this.props.info.attributes[fieldSlug].replace(
              /<\/?span[^>]*>/g,
              ""
            )}
          </a>
        </div>
      );
    }
  }

  renderOffice1() {
    return (
      <div>
        <div className="office-title">District Office</div>
        {this.renderAddress("Address 1 / District Office")}
        {this.renderPhone("Phone 1 / District Office")}
        {this.renderPhone("Fax 1 / District Office")}
      </div>
    );
  }

  renderOffice2() {
    return (
      <div>
        <div className="office-title">Albany Office</div>
        {this.renderAddress("Address 2 / Capitol or Legislative Office")}
        {this.renderPhone("Phone 2 / Capitol or Legislative Office")}
        {this.renderPhone("Fax 2 / Capitol or Legislative Office")}
      </div>
    );
  }

  renderOtherContactInfo() {
    var address3 = this.renderAddress("Address 3 / Other");
    var phone3 = this.renderPhone("Phone 3 / Other");
    var fax3 = this.renderPhone("Fax 3 / Other");
    if (address3 || phone3 || fax3) {
      return (
        <div>
          <div className="office-title">Other Contact Info</div>
          {address3}
          {phone3}
          {fax3}
        </div>
      );
    }
  }

  renderEmail(field) {
    let fieldSlug = field.replace(/ /g, "_").toLowerCase();
    if (this.props.info.attributes[fieldSlug]) {
      return (
        <div className="modal-contact-lbl">
          {`${field}`}
          <br />
          <a
            className="modal-bold"
            href={`mailto:${this.props.info.attributes[fieldSlug]}`}
          >
            {this.props.info.attributes[fieldSlug]}
          </a>
        </div>
      );
    }
  }

  renderLink(field) {
    let fieldSlug = field.replace(/ /g, "_").toLowerCase();
    if (this.props.info.attributes[fieldSlug]) {
      return (
        <div>
          <a
            className="modal-bold"
            href={this.props.info.attributes[fieldSlug]}
          >
            Official Website
          </a>
        </div>
      );
    }
  }

  parseSocialMedia(socialMediaArr) {
    let parsedSocialMedia = [];
    socialMediaArr.map((site, i) => {
      let siteValues = [];
      siteValues["link"] = site;
      if (site.includes("www")) {
        siteValues["title"] = site.match("www.(.*).com/")[1];
      } else {
        siteValues["title"] = site.match("//(.*).com/")[1];
      }
      parsedSocialMedia.push(siteValues);
    });
    return parsedSocialMedia;
  }

  get renderSocialMedia() {
    if (this.props.info.attributes.social_media) {
      let parsedSocialMedia = this.parseSocialMedia(
        this.props.info.attributes.social_media
      );
      return (
        <div>
          {parsedSocialMedia.map((site, i) => (
            <SocialIcon
              key={i}
              url={site["link"]}
              style={{ height: 25, width: 25 }}
            />
          ))}
        </div>
      );
    }
  }

  renderSexualOrientation() {
    if (this.props.info.attributes["sexual_orientation"]) {
      return (
        <span className="modal-bold">
          {`${this.props.info.attributes["sexual_orientation"]}, `}
        </span>
      );
    }
  }

  renderRace() {
    if (this.props.info.attributes["race"]) {
      return (
        <span className="modal-bold">
          {`${this.props.info.attributes["race"]}, `}
        </span>
      );
    }
  }

  renderGender() {
    if (this.props.info.attributes["gender"]) {
      return (
        <span className="modal-bold">
          {`${this.props.info.attributes["gender"]} `}
        </span>
      );
    }
  }

  render() {
    return (
      <div id={this.props.info.id}>
        <button
          className={this.setStyle}
          onClick={this.buttonHandler}
          aria-label="Senator Button"
        >
          {this.props.info.attributes.last_name}
        </button>
        <span>
          <Modal
            size="lg"
            show={this.state.showModal}
            role="menuitem"
            onHide={this.close}
            dialogClassName="my-modal"
          >
            <Modal.Header closeButton>
              <Container fluid={true}>
                <Row id="senator-info">
                  <Col sm={4} md={3}>
                    <a
                      href={`https://tools.advocacy-institute.org/ld/${
                        this.props.info.id
                      }`}
                    >
                      <img
                        className="modal-image"
                        src={this.props.info.person_s3_image}
                        width={100}
                        height={100}
                        alt="senator"
                      />
                    </a>
                  </Col>
                  <Col sm={7} md={9}>
                    <Row className="modal-title-row">
                      {this.renderTitleText}
                      <div className="full-name-title">
                        <a
                          href={`https://tools.advocacy-institute.org/ld/${
                            this.props.info.id
                          }`}
                        >
                          {this.props.info.attributes.full_name}{" "}
                          <span className="party-title">
                            ({this.props.info.attributes.party.join(", ")})
                          </span>
                        </a>
                      </div>
                      <div>
                        {this.props.info.attributes.legislative_conference}
                      </div>
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row id="district-info">
                  <Col sm={4} md={3}>
                    <img
                      className="district-image"
                      src={this.props.info.district_map_s3_image}
                      alt="district-map"
                    />
                  </Col>
                  <Col sm={7} md={9}>
                    <Row className="modal-title-row">
                      <div className="district-title">
                        District{" "}
                        {this.props.info.attributes.district_represented}
                      </div>
                      {this.renderDistrictInfo("Region")}
                      {this.renderDistrictInfo("Borough")}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Modal.Header>
            <Modal.Body>
              <Container fluid={true}>
                <Row id="contact-info">
                  <Col sm={6} md={6}>
                    <div id="office-info">
                      {this.renderOffice1()}
                      <br />
                      {this.renderOffice2()}
                      <br />
                      {this.renderOtherContactInfo()}
                    </div>
                    <br />
                  </Col>
                  <Col sm={6} md={6}>
                    <div id="social-info">
                      {this.renderEmail("Email")}
                      {this.renderEmail("Email 2")}
                      {this.renderLink("Website")}
                      {this.renderSocialMedia}
                      <br />
                      <div>
                        Seems to identify as:
                        <p>
                          {this.renderSexualOrientation()} {this.renderRace()}{" "}
                          {this.renderGender()}
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="modal-close-btn">
                <Button onClick={this.close} variant="light" aria-label="Close">
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </span>
      </div>
    );
  }
}

export default Person;
