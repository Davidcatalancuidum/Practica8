'use client'
import Link from "next/link"
import { LikeButton } from "./LikeButton"
import { useState, useEffect } from "react"

const fetchPosts = () => {
    return fetch("https://jsonplaceholder.typicode.com/posts", { 
        next: {
            revalidate: 60
        }
    })
        .then(res => res.json())
}

export function ListOfPosts () {
    const [posts, setPosts] = useState([])
    const [likeCounts, setLikeCounts] = useState({})
    
    useEffect(() => {
        fetchPosts().then(fetchedPosts => {
            setPosts(fetchedPosts.slice(0, 5))
            const initialLikeCounts = {}
            fetchedPosts.slice(0, 5).forEach(post => {
                initialLikeCounts[post.id] = 0
            })
            setLikeCounts(initialLikeCounts)
        })
    }, [])

    const handleLikeChange = (postId, change) => {
        setLikeCounts(prev => ({
            ...prev,
            [postId]: Math.max(0, (prev[postId] || 0) + change)
        }))
    }

    return posts.map(post => (
        <article key={post.id}>
            <h2 style={{color: '#09f'}}>{post.title}</h2>
            <p>{post.body}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LikeButton 
                    id={post.id} 
                    onLikeChange={(change) => handleLikeChange(post.id, change)} 
                />
                <span>Likes: {likeCounts[post.id] || 0}</span>
            </div>
            <Link href='/posts/[id]' as={`/posts/${post.id}`}>
                Ver más
            </Link>
        </article>
    ))
}