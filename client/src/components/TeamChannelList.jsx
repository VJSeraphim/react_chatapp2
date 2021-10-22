import React from 'react'

import { AddChannel } from '../assets'

const TeamChannelList = ({ children, error = false, isLoading, type}) => {
    if ( error ) {
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Unknown Connection Error.
                </p>
            </div>
        ) : null
    }

    if ( isLoading ) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === 'team' ? 'Channels' : 'Messages'} loading. Please wait ...
                </p>
            </div>
        )
    }
    
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                {/* Button */}
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList
