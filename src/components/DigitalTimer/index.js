// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {initialState: false, timersecond: 0, timerminutes: 25}
  }

  incrementfunction = () =>
    this.setState(prevState => ({timerminutes: prevState.timerminutes + 1}))

  decrementfunction = () =>
    this.setState(prevState => ({timerminutes: prevState.timerminutes - 1}))

  reseting = () => {
    clearInterval(this.intervalId)
    this.setState({timersecond: 0, timerminutes: 25, initialState: false})
  }

  startpause = () => {
    const {initialState, timersecond, timerminutes} = this.state

    // const isTimerCompleted = timersecond === timerminutes * 60
    if (initialState) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.timer, 1000)
    }
    this.setState(prevState => ({initialState: !prevState.initialState}))
  }

  timer = () => {
    const {timersecond, timerminutes} = this.state
    if (timersecond === 0) {
      this.setState(prevst => ({
        timerminutes: prevst.timerminutes - 1,
        timersecond: 59,
      }))
    } else if (timersecond > 0) {
      this.setState(prev => ({timersecond: prev.timersecond - 1}))
    }
    if (timersecond === 0 && timerminutes === 0) {
      clearInterval(this.intervalId)
      this.setState({timersecond: 0, timerminutes: 0})
    }
  }

  render() {
    const {initialState, timerminutes, timersecond} = this.state

    const startOrPauseImageUrl = initialState
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = initialState ? 'pause icon' : 'play icon'

    return (
      <div className="main">
        <div className="bg_container">
          <h1 className="main_heading">Digital Timer</h1>
          <div className="footer">
            <div className="fotter_first">
              <div className="timer_container">
                <h1 className="timer_second change">
                  {timerminutes > 9 ? timerminutes : `0${timerminutes}`}:
                  {timersecond > 9 ? timersecond : `0${timersecond}`}
                </h1>
                {initialState ? (
                  <p className="timer_second">Running</p>
                ) : (
                  <p className="timer_second">Paused</p>
                )}
              </div>
            </div>
            <div className="fotter_second">
              <div className="buttons_container">
                <button
                  onClick={this.startpause}
                  type="button"
                  className="button_1"
                >
                  <div className="inline_do">
                    <img
                      className="image1 margindo"
                      src={startOrPauseImageUrl}
                      alt={startOrPauseAltText}
                    />{' '}
                    <p>{initialState ? 'Pause' : 'Start'}</p>
                  </div>
                </button>
                <button
                  onClick={this.reseting}
                  type="button"
                  className="button_1"
                >
                  <img
                    className="image1"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />{' '}
                  Reset
                </button>
              </div>
              <p className="set_timer">Set Timer limit</p>
              <div className="increment_decrement">
                <button
                  disabled={initialState}
                  onClick={this.decrementfunction}
                  type="button"
                  className="decrement_button"
                >
                  -
                </button>
                <p className="dec_value">{timerminutes}</p>
                <button
                  disabled={initialState}
                  onClick={this.incrementfunction}
                  type="button"
                  className="decrement_button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
