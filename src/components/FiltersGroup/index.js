import {BsSearch} from 'react-icons/bs'
import './index.css'
import CategoryItems from '../CategoryItems'
import RatingItems from '../RatingItems'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    onChangeCategoryId,
    activeCategoryId,
    onChangeRatingId,
    activeRatingId,
    onChangeSearchValue,
    onClickingClearFilterBtn,
    searchInput,
  } = props
  const onChangingSearchValue = event => {
    if (event.key === 'Enter') {
      onChangeSearchValue(event.target.value)
    }
  }

  const onClickingCategoryFilterIcon = categoryId => {
    onChangeCategoryId(categoryId)
  }

  const onClickingRatingItem = ratingId => {
    onChangeRatingId(ratingId)
  }

  const onClickingClearFilter = () => {
    onClickingClearFilterBtn()
  }

  return (
    <div className="filters-group-container">
      {/* Replace this element with your code */}
      <div className="filter-input-search-icon-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input-style"
          onKeyUp={onChangingSearchValue}
          id="searchInputEl"
        />
        <div className="filter-search-icon-container">
          <BsSearch className="filter-search-icon-style" />
        </div>
      </div>
      <h1 className="category-title-heading">Category</h1>
      <ul className="filter-ul-container">
        {categoryOptions.map(eachItem => (
          <CategoryItems
            key={eachItem.categoryId}
            categoryOptions={eachItem}
            onClickingCategoryFilterIcon={onClickingCategoryFilterIcon}
            activeCategoryId={activeCategoryId}
            value={searchInput}
          />
        ))}
      </ul>
      <h1 className="category-title-heading">Rating</h1>
      <ul className="filter-ul-container">
        {ratingsList.map(eachItem => (
          <RatingItems
            ratingsList={eachItem}
            key={eachItem.ratingId}
            onClickingRatingItem={onClickingRatingItem}
            activeRatingId={activeRatingId}
          />
        ))}
      </ul>
      <button
        type="button"
        className="clear-filter-btn"
        onClick={onClickingClearFilter}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
