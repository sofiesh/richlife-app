import React from 'react'
import PropTypes from 'prop-types'
import './joyScoreSlider.css'

const joyEmoji = (score) => {
    if (score <= 2) return '😏'
    if (score <= 4) return '🙂'
    if (score <= 6) return '😊'
    if (score <= 8) return '😃'
    return '🤩'
}

const JoyScoreSlider = ({ value, onChange }) => {
    const score = value ?? 5
    return (
        <div className="joy-slider-row">
            <input
                type="range"
                min="1"
                max="10"
                value={score}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <span>{joyEmoji(score)} {score}/10</span>
        </div>
    )
}

JoyScoreSlider.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
}

export default JoyScoreSlider
