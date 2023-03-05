const ContactLine = ({ person, onClick }) => {
    return (

        <tr><td>{person.name}</td><td style={{ paddingLeft: "20px" }}>{person.number}</td><td><button onClick={() => onClick(person.id)}>delete</button></td></tr >
    )
}

export default ContactLine;