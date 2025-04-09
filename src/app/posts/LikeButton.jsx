'use client'

export function LikeButton({ id, onLikeChange }) {
    const handleLike = () => {
        onLikeChange(1)
    }

    const handleDislike = () => {
        onLikeChange(-1)
    }

    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleLike}>
                ♥
            </button>
            <button onClick={handleDislike}>
                ▼
            </button>
        </div>
    )
}