import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import cohortImage from "../../images/cohort_1.jpeg";
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
    maxWidth: "auto"
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
    height: "115%",
    width: 420
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
    console.log(this.state.students);
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardActions className={classes.cardContainer}>
            <CardMedia className={classes.media} image={cohortImage} />
            <CardContent className={classes.cardContent}>
              <div className={classes.class}>
                <Typography gutterBottom variant="h6" component="h2">
                  {this.props.user.name}
                </Typography>
                <Avatar
                  src={this.props.user.avatar}
                  className={classes.userAvatar}
                />
              </div>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.user.first_name.charAt(0).toUpperCase() +
                  this.props.user.first_name.slice(1)}{" "}
                {this.props.user.last_name.charAt(0).toUpperCase() +
                  this.props.user.last_name.slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Students: {this.state.students.length}
              </Typography>
            </CardContent>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MentorProfile);
