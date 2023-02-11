
const Filter = ({ onChange, value }) => {
    return (
        <div>Filter: <input placeholder="Search a name" onChange={onChange} value={value}></input></div>
    )
}

export default Filter;