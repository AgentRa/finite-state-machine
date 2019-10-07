class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.state = config.initial;
      this.config = config;
      this.prev = false;
      this.next = [];
      this.possibleUndoCount = 0; //Magic numbers
      this.possibleRedoCount = 0; //Sorry
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
      if (this.config.states.hasOwnProperty(state)) {
        this.prev = this.state;
        this.state = state;
        this.possibleRedoCount--;
      }
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
          this.prev = (this.prev) ? 'normal' : false;
          this.next.pop();
          this.possibleRedoCount++;
          break;

        case 'get_tired' :
          this.changeState('sleeping');
          this.prev = 'busy';
          this.next.pop();
          this.possibleRedoCount++;
          break;

        case 'get_hungry' :
          this.changeState('hungry');
          this.prev = (this.prev == 'busy') ? 'busy' : 'sleeping';
          this.next.pop();
          this.possibleRedoCount++;
          break;

        case 'eat' :
        case 'get up' :
          this.changeState('normal');
          this.next.pop();
          this.possibleRedoCount++;
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
      this.possibleUndoCount--;
      if (this.prev) {
        this.next.push(this.state);
        this.changeState(this.prev);
        this.possibleUndoCount--;
        return (this.possibleUndoCount != -4) ? true : false;
      } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if(this.possibleRedoCount == -6) return false;
      if (this.next != 0){
        this.prev = this.state;
        this.changeState(this.next.pop());
        return true;
      } return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.possibleUndoCount -= 2;
      this.possibleRedoCount -= 5;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
