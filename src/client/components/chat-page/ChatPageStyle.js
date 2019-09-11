const styles = theme => ({
 container: {
   marginTop: '90px'
 },
 root: {
  width: '100%',
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
},
inline: {
  display: 'inline',
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

})

export default styles