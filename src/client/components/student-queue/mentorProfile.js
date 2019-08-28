import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import CardBackground from "../../images/cardBg.jpg";
import api from "../../services/fetchApi";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Avatar
} from "@material-ui/core";

const styles = theme => ({
  card: {
    height: 245,
    maxWidth: "auto",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px"
  },
  cardContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: 0
  },
  cardContent: {
    height: "55%",
    width: "90%",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  media: {
    backgroundColor: "#775aa5",
    height: "115%",
    width: "100%"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    float: "right"
  },
  class: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userAvatar: {
    width: 60,
    height: 60,
    "@media (max-width: 425px)": {
      width: 50,
      height: 50
    }
  },
  noQues: {
    color: "#fff",
    margin: "24px 0px 0px 49px",
    "@media (max-width: 425px)": {
      fontSize: "38px",
      margin: "37px 0px 0px 49px"
    }
  },
  labelQues: {
    color: "#fff",
    marginLeft: "51px"
  }
});

class MentorProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      students: []
    };
  }
  componentDidMount() {
    api
      .fetch(`/api/cohort/${this.props.cohort_id}/members/list`, "get")
      .then(res => {
        this.setState({
          students: res.data.students
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardActions className={classes.cardContainer}>
            <CardMedia className={classes.media}>
              <Typography variant="h2" className={classes.noQues}>
                10
              </Typography>
              <Typography variant="subtitle1" className={classes.labelQues}>
                Student on Queue
              </Typography>
            </CardMedia>
            <CardContent className={classes.cardContent}>
              <Typography variant="overline" color="textSecondary">
                Students Enrolled: {this.state.students.length}
              </Typography>
              <Typography variant="overline" color="textSecondary">
                Cohort Password: 1425658
              </Typography>
            </CardContent>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MentorProfile);
