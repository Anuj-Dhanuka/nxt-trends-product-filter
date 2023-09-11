import './index.css'

const CategoryItems = props => {
  const {
    categoryOptions,
    onClickingCategoryFilterIcon,
    activeCategoryId,
  } = props
  const {name, categoryId} = categoryOptions

  const activeClassName =
    activeCategoryId === categoryId ? 'active-category-item' : null

  const onClickingCategoryIcon = () => {
    onClickingCategoryFilterIcon(categoryId)
  }
  return (
    <li>
      <p
        className={`filter-group-item-style ${activeClassName}`}
        onClick={onClickingCategoryIcon}
      >
        {name}
      </p>
    </li>
  )
}

export default CategoryItems
