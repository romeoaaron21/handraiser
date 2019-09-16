const styles = theme => ({
  container: {
    marginTop: 85
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },

  scrollBar: {
    "&::-webkit-scrollbar": {
      width: "0.3em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "10px",
      outline: "1px solid slategrey"
    }
  },

  // ChatPageList
  chatListHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  },

  avatarWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  chatListWrapper: {
    height: "660px",
    overflowY: "auto"
  },
  //End ChatPageList

  // ChatPageBox
  chatBoxHeader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15
  },

  activeNowWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  activeNowCircle: {
    height: 10,
    width: 10,
    borderRadius: "50%",
    backgroundColor: "#43a047",
    marginRight: "3px"
  },

  chatBoxContainer: {
    height: "auto",
    padding: 20,
  },

  senderChatWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 13
  },

  senderBox: {
    maxWidth: "40%",
    padding: 12,
    background: "#f5f5f5",
    color: "#263238",
    borderRadius: 5
  },

  time: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px"
  },

  receiverChatWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 13
  },

  receiverBox: {
    maxWidth: "40%",
    padding: 12,
    background: "#983cac",
    color: "#fff",
    borderRadius: 5
  },

  messageWrapper: {
    padding: 5,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "auto"
  },
  // End ChatPageBox
  
  // ChatInfo
  chatInfoHeader: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  avatarLarge: {
    width: 100,
    height: 100,
    marginBottom: 10
  },

  photosTitle: {
    padding: 5,
    display: "flex",
    justifyContent: "center"
  },

  photosGridContainer: {
    height: 554,
    overflowY: "auto",
    padding: 5
  },
  photosGrid:{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  }
  // End ChatInfo
});

export default styles;
