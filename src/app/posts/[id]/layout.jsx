import Link from "next/link"
import Image from "next/image"

const images = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
    'https://picsum.photos/800/400?random=4',
    'https://picsum.photos/800/400?random=5'
]

const fetchSinglePost = (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { 
        next: {
            revalidate: 60
        }
    })
        .then(res => res.json())
}

export default async function Post ({children, params}) {
    const {id} = params
    const post = await fetchSinglePost(id)
    const randomImage = images[Math.floor(Math.random() * images.length)]

    return (
        <article>
            <img 
                src={randomImage}
                alt={`Random image for post ${id}`}
                style={{ width: '100%', height: 'auto', marginTop: '1rem', marginBottom: '1rem' }}
            />
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link href={`/posts/${id}/comments`}>Ver comentarios</Link>
            {children}
        </article>
    )
}