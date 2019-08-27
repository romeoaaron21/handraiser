import io from "socket.io-client";
import api from "./fetchApi";

const socket = io("http://boom-handraiser.com:3001/");

export default {
  displayStudents: cohort_id => {
    return api.fetch(`/api/cohorts/${cohort_id}/students/`, "get").then(res => {
      socket.emit("displayMember", res.data.students);
      return res;
    });
  },
  displayCohorts: () => {
    return api
      .fetch(`/api/cohorts/api`, "get")
      .then(res => socket.emit("displayCohorts", res.data.cohorts.reverse()));
  },
  removeStudentToClass: (id, cohort_id) => {
    return api.fetch(`/api/removeStudentToClass/${id}/${cohort_id}`, "get");
  },
  membersInCohort: id => {
    return api.fetch(`/api/student/${id}/cohorts/`, "get").then(res => {
      socket.emit("displayMember", res.data.member);
    });
  },
  addCohort: (state, mentor_id) => {
    return api.fetch(`/api/cohorts/mentor/${mentor_id}/add`, "post", state);
  },
  deleteCohort: cohort_id => {
    return api.fetch(`/api/cohorts/${cohort_id}`, "get");
  },
  enrollToCohort: (cohort_id, state) => {
    return api.fetch(`/api/cohorts/${cohort_id}/students`, "post", state);
  }
};
