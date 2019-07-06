import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {
  addSelector,
  deleteSelector,
  addActionToComponent,
  deleteActionFromComponent,
} from '../actions/components';
import DataTable from './DataTable';
import { StoreInterface, StoreConfigInterface } from '../utils/Interfaces';

const convertToOptions = choices => [
  <option value="" key="" />,
  choices.map(choice => (
    <option value={choice} key={choice} style={{ color: '#000' }}>
      {choice}
    </option>
  )),
];

const ComponentReduxSetup: React.FC = (props: any): JSX.Element => {
  const [chosenAction, setChosenAction] = useState('');
  const [chosenSelector, setChosenSelector] = useState('');
  const storeConfig = useSelector(store => store.workspace.storeConfig);
  const { focusComponent, classes } = props;
  const dispatch = useDispatch();
  const rowHeader = ['Actions', 'Store Selections'];
  console.log(focusComponent);
  let selectorOptions = [];
  let actionOptions = [];
  Object.keys(storeConfig.reducers).forEach((reducerName) => {
    Object.keys(storeConfig.reducers[reducerName].store).forEach((storePieceName) => {
      selectorOptions.push(`${reducerName}.${storePieceName}`);
    });
    Object.keys(storeConfig.reducers[reducerName].actions).forEach((actionName) => {
      actionOptions.push(`${actionName}`);
    });
  });

  selectorOptions = convertToOptions(selectorOptions);
  actionOptions = convertToOptions(actionOptions);

  const handleChange = cb => e => cb(e.target.value);

  const handleSubmit = (cb, value) => {
    const callback = cb;
    return (e) => {
      e.preventDefault();
      console.log(value);
      return dispatch(callback(value));
    };
  };

  const submitValueUsingAction = (title, value, onChange, onSubmit, choices) => (
    <Grid item xs={3}>
      <form className="props-input" onSubmit={handleSubmit(onSubmit, value)}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <FormControl required>
              <InputLabel className={classes.light} htmlFor="propType">
                {`add ${title} !`}
              </InputLabel>
              <Select
                native
                className={classes.light}
                id="propType"
                placeholder="title"
                onChange={handleChange(onChange)}
                value={value}
                required>
                {choices}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button color="primary" aria-label="Add" type="submit" variant="contained" size="large">
              {`submit ${title} selection`}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
  return (
    <div className={'htmlattr'}>
      {' '}
      {Object.keys(focusComponent).length < 1 ? (
        <div style={{ marginTop: '20px', width: '90%' }}>Click a component to view its props.</div>
      ) : (
        <div className="props-container" style={{ marginTop: '20px', width: '90%', height: '80%' }}>
          <Grid container spacing={8}>
            {submitValueUsingAction(
              'store selection',
              chosenSelector,
              setChosenSelector,
              addSelector,
              selectorOptions,
            )}
            {submitValueUsingAction(
              'action',
              chosenAction,
              setChosenAction,
              addActionToComponent,
              actionOptions,
            )}
            <Grid item xs={8}>
              <DataTable
                rowHeader={['Store Selections']}
                rowData={focusComponent.selectors}
                deletePropHandler={name => dispatch(deleteSelector(name))}
              />
              <DataTable
                rowHeader={['Actions']}
                rowData={focusComponent.actions}
                deletePropHandler={name => dispatch(deleteActionFromComponent(name))}
              />
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
      )}
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    color: '#eee',
    backgroundColor: '#333333',
  },
  column: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  icon: {
    fontSize: '20px',
    color: '#eee',
    opacity: '0.7',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red',
    },
  },
  cssLabel: {
    color: 'white',

    '&$cssFocused': {
      color: 'green',
    },
  },
  cssFocused: {},
  input: {
    color: '#eee',
    marginBottom: '30px',
    width: '50%',
    textAlign: 'center',
  },
  light: {
    color: '#eee',
  },
  avatar: {
    color: '#eee',
    fontSize: '10px',
  },
});

// const Placeholder: React.FC = (props): JSX.Element => <div>HI</div>;
export default withStyles(styles)(ComponentReduxSetup);