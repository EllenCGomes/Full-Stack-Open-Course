import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filterChange(event.target.value))
    }

    return (
        <div style={{ margin: "30px 0px 15px 0px" }}>
            <input placeholder="Search" name="filter" onChange={handleChange} />
        </div>
    )
}

export default Filter