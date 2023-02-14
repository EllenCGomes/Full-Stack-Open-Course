import ContactLine from "./ContactLine";

const Contact = ({ people, deletePerson }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th style={{ paddingLeft: "20px" }}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {people.map(person => <ContactLine key={person.name} person={person} onClick={deletePerson} />)}
            </tbody>
        </table>
    )
};

export default Contact;