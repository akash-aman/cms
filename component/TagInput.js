import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    backgroundColor: "transparent",
    gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
    // gridGap: "1rem",
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    border: "none",
    boxShadow: "none"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const TagInput = ({ chipData,handleDelete }) =>{
  const classes = useStyles();


  return (
    <Paper component="ul" className={classes.root}>
{chipData.map((data) => {
  let icon;

  if (data.label === 'React') {
    icon = <TagFacesIcon />;
  }

  return (
    <li key={data.key}>
      <Chip
        icon={icon}
        label={data.label}
        onDelete={ handleDelete(data)}
        className={classes.chip}
      />
    </li>
  );
})}
</Paper>
  );
}


export default TagInput