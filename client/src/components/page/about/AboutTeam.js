import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "../../widgets/materialKit/components/Grid/GridContainer.jsx";
import GridItem from "../../widgets/materialKit/components/Grid/GridItem.jsx";
import Button from "../../widgets/materialKit/components/CustomButtons/Button.jsx";
import Card from "../../widgets/materialKit/components/Card/Card.jsx";
import CardBody from "../../widgets/materialKit/components/Card/CardBody.jsx";

import teamStyle from "../../widgets/materialKit/assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import team1 from "../../../components/widgets/materialKit/assets/img/faces/avatar.jpg";
import team2 from "../../../components/widgets/materialKit/assets/img/faces/christian.jpg";
import team3 from "../../../components/widgets/materialKit/assets/img/faces/kendall.jpg";

class TeamSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src='/assets/images/team-1.png' alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                Lorem Ipsum
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src='/assets/images/team-2.png' alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Lorem Ipsum
                  <br />
                  <small className={classes.smallTitle}>Designer</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src='/assets/images/team-3.png' alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                Lorem Ipsum
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src='/assets/images/team-4.png' alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                Lorem Ipsum
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src='/assets/images/team-5.png' alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                Lorem Ipsum
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
