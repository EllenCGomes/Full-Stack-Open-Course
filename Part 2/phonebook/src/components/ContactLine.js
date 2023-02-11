const ContactLine = ({ person }) => {
    return (

        <tr><td>{person.name}</td><td style={{ paddingLeft: "20px" }}>{person.phone}</td></tr>
    )
}

export default ContactLine;