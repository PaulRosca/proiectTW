import { Icon } from "@iconify/react"
import { useState } from "react"
import { Container, SearchBarInput } from "./SearchBar.styled"

export const SearchBar = ({type}) => {
    const [searchedData, setSearchedData] = useState("");
    const placeholder = `Search ${type}`;
    return(
        <Container>
            <Icon icon="ant-design:search-outlined" style={{"color": "#536471", "fontSize": "1.2rem", "cursor": "pointer"}} onClick={(e) => alert(`Searching for ${searchedData}`)}/>
            <SearchBarInput placeholder={placeholder} value={searchedData} onChange={(e) => setSearchedData(e.target.value)}></SearchBarInput>
        </Container>
    )
}