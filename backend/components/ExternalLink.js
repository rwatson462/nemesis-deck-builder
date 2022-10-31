
export default function ExternalLink({children, ...props}) {
    return <a {...props} target="_blank">{children}</a>
}