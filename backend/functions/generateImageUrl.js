
export default function generateImageUrl(cardName) {
    return (
        cardName.replace(/[^a-z0-9 \-]/gi, '').replace(/ /g, '-') + '.png'
    )
}
