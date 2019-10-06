class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.state = config.initial;
      this.config = config;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.config.states.hasOwnProperty(state)) {this.state = state;}
      else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (!this.config.states[this.state].transitions.hasOwnProperty(event)) {
        throw new Error();
      }

      switch (event) {

        case 'study' :
          this.changeState('busy');
          break;

        case 'get_tired' :
          this.changeState('sleeping');
          break;

        case 'get_hungry' :
          this.changeState('hungry');
          break;

        case 'eat' :
        case 'get up' :
          this.changeState('normal');
          break;
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event = null) {
      let array = [];
        for(let key in this.config.states){
          array.push(key);
        }
      if (!event) {
        return array;
      }
      else {
        array = [];
        for(let key in this.config.states) {
          if (this.config.states[key].transitions.hasOwnProperty(event)) {
            array.push(key);
          }
        }
        return array;
      }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
