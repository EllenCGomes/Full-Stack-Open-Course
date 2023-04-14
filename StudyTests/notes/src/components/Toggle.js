import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggle = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    Toggle.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

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
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="toggleContent">
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})


export default Toggle