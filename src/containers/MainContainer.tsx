import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import RightPanel from '../components/RightPanel.tsx';
import BottomPanel from '../components/BottomPanel.tsx';
import theme from '../components/theme.ts';
import { handleTransform, changeFocusChild, changeComponentFocusChild, deleteChild } from '../actions/components.ts';
import KonvaStage from '../components/KonvaStage.tsx';
import { ComponentInt, ComponentsInt } from '../utils/interfaces.ts';

interface PropsInt {
  components: ComponentsInt;
  focusComponent: ComponentInt;
  selectableChildren: Array<number>;
  classes: any;
  addComponent: any;
  addChild: any;
  changeFocusComponent: any;
  changeFocusChild: any;
  deleteComponent: any;
  createApp: any;
  deleteAllData: any;
  handleTransformation: any;
  focusChild: any;
  changeComponentFocusChild: any;
  deleteChild: any;
}

interface StateInt {
  draggable: boolean;
  toggleClass: boolean;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  modal: any;
}

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = (dispatch: any) => ({
  handleTransformation: (
    componentId: number,
    childId: number,
    { x, y, width, height }: { x: number; y: number; width: number; height: number },
  ) =>
    dispatch(
      handleTransform(componentId, childId, {
        x,
        y,
        width,
        height,
      }),
    ),
  // openPanel: component => dispatch(openExpansionPanel(component)),
  changeFocusChild: ({ childId }: { childId: number }) => dispatch(changeFocusChild({ childId })),
  changeComponentFocusChild: ({ componentId, childId }: { componentId: number; childId: number }) =>
    dispatch(changeComponentFocusChild({ componentId, childId })),
  deleteChild: ({}) => dispatch(deleteChild({})), // if u send no prms, function will delete focus child.
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  stateComponents: store.workspace.components,
});

class MainContainer extends Component<PropsInt, StateInt> {
  state = {
    draggable: false,
    toggleClass: true,
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    modal: '',
  };

  render() {
    const { draggable, scaleX, scaleY, modal, toggleClass } = this.state;
    const {
      components,
      handleTransformation,
      focusComponent,
      focusChild,
      changeFocusChild,
      changeComponentFocusChild,
      deleteChild,
      classes,
    } = this.props;
    const { main }: { main: HTMLDivElement } = this;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main-container">
          {modal}
          <div className="top-container">
            <RightPanel />
            <div className="main" ref={main}>
              <KonvaStage
                scaleX={1}
                scaleY={1}
                draggable={draggable}
                components={components}
                handleTransform={handleTransformation}
                focusComponent={focusComponent}
                focusChild={focusChild}
                changeFocusChild={changeFocusChild}
                changeComponentFocusChild={changeComponentFocusChild}
                deleteChild={deleteChild}
                classes={classes}
              />
            </div>
          </div>
          <BottomPanel focusComponent={focusComponent} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
