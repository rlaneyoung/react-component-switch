import React from 'react';

/**
  * Class Representing ComponentSwitch - a react component for switching between a list of components.
  * Useful for any application that requires steps. Ex: Wizards, Account Creation, Two factor Auth, etc.
  */

module.exports = class ComponentSwitch extends React.Component{

  constructor(){
    super();

    this.state = {
      step: 0
    }

    // Bind methods to ComponentSwitch
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.setStep = this.setStep.bind(this);

  }

/**
  * Function to switch to any specified step
  *
  * @param {Number|String} step The step to be switched to.
  */
  setStep(step){
    const components = this.props.components;
    const sides = this.props.sides;

    //Create a range array out of components.length.
    var range = Array.from(Array(components.length).keys());

    if((typeof step === "number" && step in range)){
      this.setState({
        step: step,
        side: false     // Set side to false to prevent re-rendering of side component
      });
    }
    else if((typeof step === "string" && step in sides)){
      this.setState({
        side: step
      });
    }
  }

/**
  * Function to go to next step
  */
  next(){
    const components = this.props.components;
    let wrap = this.props.wrap;
    const setStep = this.setStep;

    let step = this.state.step + 1;
    if(step < components.length){     // Prevent step value from exceeding range of steps (components.length);
      setStep(step)
    }
    else if(wrap){                    // If ComponentSwitch has prop 'wrap', circle back to first step (step 0)
      setStep(0);
    }

  }


/**
  * Function to go back one step.
  */
  back(){
    const components = this.props.components;
    const wrap = this.props.wrap;
    const setStep = this.setStep;

    let step = this.state.step - 1;


    if(step >= 0){                       // Prevent step value from going into negatives
      setStep(step);
    }
    else if(wrap){                       // Allow wrapping to last step
      setStep(components.length - 1);
    }
  }

  render(){
    const components = this.props.components;
    const sides = this.props.sides;

    let step = this.state.step;
    let side = this.state.side;
    let Component;

    if(side in sides){
      Component = this.props.sides[side];         // If this.state.side is truthy, Component = side component.
    }
    else if(step in components){
      Component = this.props.components[step];    // Otherwise, if this.state.step in this.props.components, Component = main component.
    }
    else{
      Component = null;
    }

    if(Component){                      
      return <Component ComponentSwitch={this} />;  // Pass ComponentSwitch down as property to child component so it has access to next, back, and setStep function.
    }
  }

}
