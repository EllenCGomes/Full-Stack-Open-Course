import ContactLine from "./ContactLine";

const Contact = ({ persons }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th style={{ paddingLeft: "20px" }}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {persons.map(person => <ContactLine key={person.name} person={person} />)}
            </tbody>
        </table>
    )
};

export default Contact;