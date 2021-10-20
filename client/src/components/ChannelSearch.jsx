import React, { useState, useEffect } from 'react'
import { useChatContext } from 'stream-chat-react'

import { SearchIcon } from '../assets'

const ChannelSearch = () => {
    const [query, setQuery] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const onSearch = (e) => {
        e.preventDefault()
        setLoading(true)
    }

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input 
                    className="channel-search__input__text"
                    placeHolder="Search"
                    type="text"
                    value={query}
                    onChange={onSearch}
                />
            </div>
        </div>
    )
}

export default ChannelSearch
