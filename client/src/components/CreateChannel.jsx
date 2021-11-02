import React, { useState } from 'react'
import { useChatContext } from 'stream-chat=react'

import { UserList } from './'
import { CloseCreateChannel  } from '../assets'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (e) => {
        e.preventDefault()
        setChannelName(e.target.value)
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>
                Name
            </p>
            <input value={} onChange={} placeholder="Channel Name(No Spaces Allowed)"/>
            <p>
                Add Members
            </p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const [channelName, setChannelName] = useState('')

    return (
        <div className="create-channel__Container">
            {/* <ChannelNameInput />*/}
            <div className="create-channel__header">
                <p>
                    {createType === 'team' ? 'Create New Channel' : 'Send your message'}
                </p>
                <CloseCreateChannel />
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
        </div>
    )
}

export default CreateChannel
