import React, { Component } from 'react';

class SearchBar extends Component {

    handleSearch = e => {

        this.props.searchProjects(e.target.value)

    }

    render() {

        return (
            <>
                <input className="search-bar" type="text" placeholder='Buscador' onChange={this.handleSearch} />

            </>
        )
    }

}

export default SearchBar;

