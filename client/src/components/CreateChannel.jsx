import React, { useState } from 'react'
import { useChatContext } from 'stream-chat=react'

import { UserList } from './'
import { CloseCreateChannel  } from '../assets'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const [selectedUsers, setSelectedUsers] = useState([])
    const { client, setActiveChannel } = useChatContext([client.userID || ''])

    const handleChange = (e) => {
        e.preventDefault()
        setChannelName(e.target.value)
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>
                Name
            </p>
            <input value={channelName} onChange={handleChange} placeholder="Channel Name(No Spaces Allowed)"/>
            <p>
                Add Members
            </p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const [selectedUsers, setSelectedUsers] = useState([])
    const { client, setActiveChannel } = useChatContext([client.userID || ''])
    const [channelName, setChannelName] = useState('')

    const createChannel = async (e) => {
        e.preventDefault()
        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            })

            await newChannel.watch()
            
            setChannelName('')
            setIsCreating(false)
            setSelectedUsers([client.userID])
            setActiveChannel(newChannel)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="create-channel__Container">
            {/* <ChannelNameInput />*/}
            <div className="create-channel__header">
                <p>
                    {createType === 'team' ? 'Create New Channel' : 'Send your message'}
                </p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>
                    {createType === 'team' ? 'Create Channel' : 'Create Message Group'}
                </p>
            </div>
        </div>
    )
}

export default CreateChannel
