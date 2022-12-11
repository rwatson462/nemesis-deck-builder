
export default function CardHeader({toggleImage, children}) {
    return (
        <div className="card-header" onClick={e => toggleImage()}>
            {children}
        </div>
    )
}
