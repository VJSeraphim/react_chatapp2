import React from 'react'
import { Channel, useChatContext } from 'stream-chat-react'

import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from './'

const ChannelContainer = ({
    isCreating,
    isEditing,
    setIsCreating,
    setIsEditing,
    createType
}) => {
    const { channel } = useChatContext()

    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        )
    }

    const Empty = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">
                Beginning of Chat List
            </p>
            <p className="channel-empty__second">
                Start sending messages to others!
            </p>
        </div>
    )

    return (
        <div className="channel__container">
            <Channel 
                EmptyStateIndicator={Empty}
                Message={(messageProps, i) => 
                    <TeamMessage key={i} {...messageProps} />
                }
            >
                <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
    )
}

export default ChannelContainer
