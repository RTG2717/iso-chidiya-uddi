export default function OtherUserFingerDisplay({ clientID, otherUserFingers }) {
    return (
        <div>
            <div className='text-2xl font-bold'>Other Users</div>
            <div className='grid grid-cols-2 gap-4'>
                {Array.from(otherUserFingers).map(([otherClientID, data]) => {
                    if (otherClientID === clientID) return null;
                    return (
                        <div
                            key={otherClientID}
                            className='flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg'
                        >
                            <div className='text-xl font-bold'>
                                {otherClientID}
                            </div>
                            <div className='text-xl'>
                                {data.fingerUp ? '👆' : '👇'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
