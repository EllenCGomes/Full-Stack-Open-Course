const Form = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div> Name: <input onChange={props.onChangeName} value={props.nameValue} /></div>
            <br />
            <div> Number: <input onChange={props.onChangeNumber} value={props.numberValue} /></div>
            <br />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form;