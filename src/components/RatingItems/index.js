import './index.css'

const RatingItems = props => {
  const {ratingsList, onClickingRatingItem, activeRatingId} = props
  const {imageUrl, ratingId} = ratingsList
  const onClickingRating = () => {
    onClickingRatingItem(ratingId)
  }

  const activeClassName =
    activeRatingId === ratingId ? 'active-rating-style' : ''
  return (
    <li className="rating-item-li-container" onClick={onClickingRating}>
      <img
        src={imageUrl}
        alt={`rating ${ratingId}`}
        className="rating-star-style"
      />
      <p className={`filter-rating-description ${activeClassName}`}>&up</p>
    </li>
  )
}

export default RatingItems
