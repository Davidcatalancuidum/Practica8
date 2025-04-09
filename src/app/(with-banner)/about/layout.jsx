export default function PostsLayout({ children }) {
 return (
    <div>
        <marquee style={{ background: "red", color: "white"}}>El mejor canal de Youtube de programación: @Ismanaq</marquee>
        {children}
    </div>
  )
}