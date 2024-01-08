export const RaiseHand = () => {
    const localPeerId = useHMSStore(selectLocalPeerID);
    const metaData = useHMSStore(selectPeerMetadata(localPeerId));
    const hmsActions = useHMSActions();
    const toggleRaiseHand = useCallback(async () => {
        const newMetadata = { ...metaData, isHandRaised: !metaData.isHandRaised };
        await hmsActions.changeMetadata(newMetadata);
    }, [hmsActions, metaData]);
    return (
        <button onClick={toggleRaiseHand}>
            {metaData.isHandRaised ? 'Hand Raised' : 'Hand not Raised'}
        </button>
    );
};

export const LOWER_HAND = 'LOWER_HAND';
// don't save messages with this type in store
hmsActions.ignoreMessageTypes([LOWER_HAND]);

// host can send a custom message to the peer who has raised hand
await hmsActions.sendDirectMessage('', peerIdWithRaisedHand, LOWER_HAND);

// the peer on receiving the event can lower their hand
const hmsActions = useHMSActions();
const notification = useHMSNotifications(HMSNotificationsTypes.NEW_MESSAGE);
const localPeerId = useHMSStore(selectLocalPeerID);
const metadata = useHMSStore(selectPeerMetadata(localPeerId));

useEffect(() => {
    if (!notification) {
        return;
    }

    const message = notification.data;
    if (message?.type === LOWER_HAND) {
        const newMetadata = { ...metadata, isHandRaised: false };
        hmsActions.changeMetadata(newMetadata);
    }
}, [notification]);
