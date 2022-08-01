import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {isTimerRunning: false, elapsedTimeInSeconds: 0}

  componentDidMount() {
    console.log('component did mount called')
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onClickResetButton = () => {
    this.setState({isTimerRunning: false, elapsedTimeInSeconds: 0})
    clearInterval(this.timerId)
  }

  onClickStopTimer = () => {
    const {elapsedTimeInSeconds} = this.state
    this.setState({isTimerRunning: false})

    clearInterval(this.timerId)
    console.log(elapsedTimeInSeconds)
  }

  updateTime = () => {
    this.setState(prevState => ({
      elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
    }))
  }

  onClickStartTimer = () => {
    this.timerId = setInterval(this.updateTime, 1000)
    this.setState({isTimerRunning: true})
  }

  renderSeconds = () => {
    const {elapsedTimeInSeconds} = this.state
    const seconds = Math.floor(elapsedTimeInSeconds % 60)

    return seconds < 10 ? `0${seconds}` : seconds
  }

  renderMinutes = () => {
    const {elapsedTimeInSeconds} = this.state
    const minutes = Math.floor(elapsedTimeInSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`
    console.log('render method is called')

    return (
      <div className="app-container">
        <div className="stop-watch-container">
          <h1>Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                className="timer-image"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="heading">Timer</p>
            </div>
            <h1>{time}</h1>
            <div className="timer-buttons">
              <button
                className="button start"
                type="button"
                onClick={this.onClickStartTimer}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                className="button stop"
                type="button"
                onClick={this.onClickStopTimer}
              >
                Stop
              </button>
              <button
                className="button reset"
                type="button"
                onClick={this.onClickResetButton}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
