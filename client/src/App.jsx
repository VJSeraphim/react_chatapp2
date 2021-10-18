import React from 'react'
import { StreahChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelContainer, ChannelListContainer } from './components'

const apiKey = 'eh75qxnvn6z9'

const client = StreamChat.getInstance(apiKey)

const App = () => {
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                
                />
                <ChannelContainer 
                />

            </Chat>
        </div>
    )
}

export default App