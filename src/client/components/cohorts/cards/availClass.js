import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import CardBackground from "../../../images/classroomBg.jpg";
import { Grid } from "semantic-ui-react";

const styles = theme => ({
  card: {
    height: 275,
    width: 300,
    margin: theme.spacing(2)
  },
  wholeCardContainer: {
    height: "100%",
    width: 300,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  cardContainer: {
    height: 225,
    width: 300,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  cardContent: {
    height: "55%",
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  buttonContainer: {
    height: 50,
    paddingTop: 0,
    paddingBottom: 0
  },
  media: {
    height: "45%",
    width: 300
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
  }
});

class AvailClass extends React.Component {
  render() {
    const {
      classes,
      cohorts,
      openEnroll,
      openLeave,
      openStudentList,
      members,
      user_id
    } = this.props;

    return (
      <React.Fragment>
        {cohorts.map(cohort => {
          return members.filter(
            member =>
              member.cohort_id === cohort.id && member.student_id === user_id
          ).length !== 0 ? (
            console.log(members, cohorts)
          ) : (
            <Grid xs={3} key={cohort.id}>
              <Card className={classes.card}>
                <CardActionArea
                  id={cohort.id}
                  onClick={e => openEnroll(e, cohort.id)}
                  name="enroll"
                  className={classes.wholeCardContainer}
                >
                  <CardMedia
                    className={classes.media}
                    image={CardBackground}
                    title={cohort.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <div className={classes.class}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {cohort.name}
                      </Typography>
                      <Avatar
                        alt={cohort.first_name + " " + cohort.last_name}
                        src={cohort.avatar}
                        className={classes.bigAvatar}
                      />
                    </div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Mentor: {cohort.first_name + " " + cohort.last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Students: {cohort.members}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.buttonContainer}>
                  <Button
                    size="small"
                    color="primary"
                    id={cohort.id}
                    onClick={openLeave}
                  >
                    Leave
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    id={cohort.id}
                    onClick={() => {
                      openStudentList(cohort.id);
                    }}
                  >
                    Students
                  </Button>
                </CardActions>
                }
              </Card>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AvailClass);
