import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Toggle = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const showDisplay = { display: visible ? "" : "none" };
    const hideDisplay = { display: visible ? "none" : "" };

    Toggle.propTypes = {
        buttonLabel: PropTypes.string.isRequired,
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideDisplay}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showDisplay}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

Toggle.displayName = "Toggle"

export default Toggle