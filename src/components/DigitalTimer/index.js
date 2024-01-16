// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialMinutes: 25,
      initialSec: 0,
      isPause: false,
      reset: true,
    }
  }

  renderTimer = () => {
    const {initialSec, initialMinutes} = this.state

    const remainingTimer = initialMinutes * 60 - initialSec
    const remainingSec = Math.floor(remainingTimer % 60)
    const remainingMin = Math.floor(remainingTimer / 60)
    const stringifiedSec = remainingSec > 9 ? remainingSec : `0${remainingSec}`
    const stringifiedMin = remainingMin > 9 ? remainingMin : `0${remainingMin}`

    return `${stringifiedMin}:${stringifiedSec}`
  }

  handleStart = () => {
    const {isPause, initialSec, initialMinutes} = this.state
    if (initialSec === initialMinutes * 60) {
      this.setState({initialSec: 0})
    }
    if (isPause === false) {
      this.timerId = setInterval(this.timer, 1000)
    } else {
      clearInterval(this.timerId)
    }
    this.setState(prevState => ({isPause: !prevState.isPause, reset: false}))
  }

  timer = () => {
    const {initialSec, initialMinutes} = this.state
    if (initialSec === initialMinutes * 60) {
      clearInterval(this.timerId)
      this.setState({
        initialSec: 0,
        initialMinutes: 25,
        isPause: false,
        reset: true,
      })
    } else {
      this.setState(prevState => ({
        initialSec: prevState.initialSec + 1,
      }))
    }
  }

  handleReset = () => {
    this.setState(() => ({
      reset: true,
      isPause: false,
      initialMinutes: 25,
      initialSec: 0,
    }))
    clearInterval(this.timerId)
  }

  handleDec = () => {
    const {isPause, reset, initialMinutes} = this.state
    if (!isPause && reset && initialMinutes > 0) {
      this.setState(prevState => ({
        initialMinutes: prevState.initialMinutes - 1,
      }))
    }
  }

  handleInc = () => {
    const {isPause, reset, initialMinutes} = this.state
    if (!isPause && reset && initialMinutes >= 0) {
      this.setState(prevState => ({
        initialMinutes: prevState.initialMinutes + 1,
      }))
    }
  }

  render() {
    const {initialMinutes, isPause, reset} = this.state
    console.log(`reset==${reset} and pause==${isPause}`, initialMinutes)
    const selectOne = isPause
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altIcon = isPause ? 'pause icon' : 'play icon'

    return (
      <div className="main_container">
        <h1 className="main_heading">Digital Timer</h1>
        <div className="timer_container">
          <div className="left_container">
            <div className="white_container">
              <h1 className="my_timer_color">{this.renderTimer()}</h1>
              <p className="pause_heading">{isPause ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="right_container">
            <div className="start_pause_container">
              <button
                onClick={this.handleStart}
                type="button"
                className="my_button"
              >
                <div className="button_container">
                  <img className="image_icon" src={selectOne} alt={altIcon} />

                  <p className="text_inside_button">
                    {isPause ? 'Pause' : 'Start'}
                  </p>
                </div>
              </button>
              <button
                onClick={this.handleReset}
                type="button"
                className="my_button"
              >
                <div className="button_container">
                  <img
                    className="image_icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="text_inside_button">Reset</p>
                </div>
              </button>
            </div>
            <p className="set_limit">Set Timer Limit</p>
            <div className="increment_container">
              <button
                onClick={this.handleDec}
                type="button"
                className="inc_dec_btn"
              >
                -
              </button>
              <p className="inc_value">{parseInt(initialMinutes)}</p>
              <button
                onClick={this.handleInc}
                type="button"
                className="inc_dec_btn"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
