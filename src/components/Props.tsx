import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import { addProp, deleteProp } from '../actions/components';
import DataTable from './DataTable';
import { ComponentInt, StoreInterface } from '../utils/interfaces';

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
    marginBottom: '10px',
    width: '60%',
  },
  light: {
    color: '#eee',
  },
  avatar: {
    color: '#eee',
    fontSize: '10px',
  },
});

const mapDispatchToProps = (dispatch: any) => ({
  addProp: ({
    key,
    value,
    required,
    type,
  }: {
  key: string;
  value: string;
  required: boolean;
  type: string;
  }) => dispatch(
    addProp({
      key,
      value,
      required,
      type,
    }),
  ),
  deleteProp: (propId: number) => dispatch(deleteProp(propId)),
});

const mapStateToProps = (store: StoreInterface) => ({
  focusComponent: store.workspace.focusComponent,
  storeConfig: store.workspace.storeConfig,
});

const availablePropTypes = {
  string: 'STR',
  number: 'NUM',
  object: 'OBJ',
  array: 'ARR',
  boolean: 'BOOL',
  function: 'FUNC',
  // symbol: 'SYM',
  node: 'NODE',
  element: 'ELEM',
  any: 'ANY',
  tuple: 'TUP',
  enum: 'ENUM',
};

const typeOptions = [
  <option value="" key="" />,
  ...Object.keys(availablePropTypes).map(type => (
    <option value={type} key={type} style={{ color: '#000' }}>
      {type}
    </option>
  )),
];

class Props extends Component {
  state = {
    propKey: '',
    propValue: '',
    propRequired: true,
    propType: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  };

  togglePropRequired = () => {
    this.setState({
      propRequired: !this.state.propRequired,
    });
  };

  handleAddProp = (event) => {
    event.preventDefault();

    const {
      propKey, propValue, propRequired, propType,
    } = this.state;

    // check if prop exists with same key. CANNOT have duplicates
    const savedPropKeys = this.props.focusComponent.props.map(p => p.key);
    if (savedPropKeys.includes(propKey)) {
      window.alert(`A prop with the name: "${propKey}" already exists.`);
      return;
    }

    // check if prop starts with digits. Digits at string start breaks indexedDB
    if (/^\d/.test(propKey)) {
      window.alert('Props are not allowed to begin with digits');
      return;
    }

    this.props.addProp({
      key: propKey,
      value: propValue,
      required: propRequired,
      type: propType,
    });

    this.setState({
      propKey: '',
      propValue: '',
      propRequired: true,
      propType: '',
    });
  };

  render() {
    const {
      focusComponent, classes, deleteProp, addProp,
    } = this.props;

    const rowHeader = ['_Key', 'Value', 'Type', 'Required'];
    // prepare the saved Props in a nice way, so you can sent them to TableData
    const propsRows = focusComponent.props.map(prop => ({
      _Key: prop.key,
      Value: prop.value,
      Type: prop.type,
      Required: prop.required,
      id: prop.id,
    }));

    return (
      <div className={'htmlattr'}>
        {' '}
        {Object.keys(focusComponent).length < 1 ? (
          <div style={{ marginTop: '20px', width: '90%' }}>
            Click a component to view its props.
          </div>
        ) : (
          <Fragment>
            <div
              className="props-container"
              style={{ marginTop: '20px', width: '90%', height: '80%' }}>
              <Grid container spacing={8}>
                <Grid item xs={3}>
                  <form className="props-input" onSubmit={this.handleAddProp}>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <TextField
                          id="propKey"
                          label="Key"
                          margin="normal"
                          autoFocus
                          onChange={this.handleChange}
                          value={this.state.propKey}
                          required
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            className: classes.input,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="propValue"
                          label="Value"
                          margin="normal"
                          onChange={this.handleChange}
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            className: classes.input,
                          }}
                          value={this.state.propValue}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl required>
                          <InputLabel className={classes.light} htmlFor="propType">
                            Type
                          </InputLabel>
                          <Select
                            native
                            className={classes.light}
                            id="propType"
                            placeholder="title"
                            onChange={this.handleChange}
                            value={this.state.propType}
                            required>
                            {typeOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <div className={classes.column}>
                          <InputLabel className={classes.light} htmlFor="propRequired">
                            Required?
                          </InputLabel>
                          <Switch
                            checked={this.state.propRequired}
                            onChange={this.togglePropRequired}
                            value="propRequired"
                            color="primary"
                            id="propRequired"
                          />
                        </div>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          aria-label="Add"
                          type="submit"
                          // disabled={!this.state.propKey || !this.state.propType}
                          variant="contained"
                          size="large">
                          ADD PROP
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item xs={8}>
                  <DataTable
                    rowHeader={rowHeader}
                    rowData={propsRows}
                    deletePropHandler={deleteProp}
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Props));
