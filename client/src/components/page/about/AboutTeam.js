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
          <GridContainer style={{marginLeft: "0", marginRight: "0"}}>
            {this.props.data ? this.props.data.map((team, index) => (
              <GridItem xs={12} sm={12} md={4} key={index}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={`/assets/images/${team.avatar}`} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                {team.name}
                  <br />
                  <small className={classes.smallTitle}>{team.position}</small>
                </h4>
              </Card>
            </GridItem>
            )) : 'Loading...'}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
