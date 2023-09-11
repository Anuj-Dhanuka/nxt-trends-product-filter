import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const allProductListConstants = {
  initial: 'INITIAL',
  loading: 'IS_LOADING',
  noProductFind: 'NO_PRODUCT_FIND',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    renderingProduct: allProductListConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    rating: '',
    searchInput: '',
    activeCategoryId: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  onChangeSearchValue = searchedValue => {
    this.setState({searchInput: searchedValue}, this.getProducts)
  }

  clearInputEl = () => {
    const inputEl = document.getElementById('searchInputEl')
    inputEl.value = ''
  }

  onChangeCategoryId = categoryId => {
    this.setState(
      {category: categoryId, activeCategoryId: categoryId},
      this.getProducts,
    )
  }

  onChangeRatingId = ratingId => {
    this.setState(
      {rating: ratingId, activeRatingId: ratingId},
      this.getProducts,
    )
  }

  onClickingClearFilterBtn = () => {
    this.setState(
      {
        searchInput: '',
        category: '',
        activeCategoryId: '',
        rating: '',
        activeRatingId: '',
      },
      this.getProducts,
    )
    const inputEl = document.getElementById('searchInputEl')
    inputEl.value = ''
  }

  getProducts = async () => {
    this.setState({
      renderingProduct: allProductListConstants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, rating, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${searchInput}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      if (fetchedData.products.length === 0) {
        this.setState({renderingProduct: allProductListConstants.noProductFind})
      } else {
        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))
        this.setState({
          productsList: updatedData,
          renderingProduct: allProductListConstants.success,
        })
      }
    } else {
      this.setState({renderingProduct: allProductListConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderNoProductFound = () => (
    <div className="no-product-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
      />
      <h1 className="no-product-heading">No Products Found</h1>
      <p className="no-product-description">
        We could not find any products. Try other filters.
      </p>
    </div>
  )

  renderProductsFailureView = () => (
    <div className="no-product-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1 className="no-product-heading">Oops! Something Went Wrong</h1>
      <p className="no-product-description">
        We are having some trouble processing your request. <br />
        Please try again
      </p>
    </div>
  )

  renderAllProductSection = () => {
    const {renderingProduct} = this.state
    switch (renderingProduct) {
      case allProductListConstants.loading:
        return this.renderLoader()
      case allProductListConstants.success:
        return this.renderProductsList()
      case allProductListConstants.noProductFind:
        return this.renderNoProductFound()
      case allProductListConstants.failure:
        return this.renderProductsFailureView()

      default:
        return null
    }
  }

  // TODO: Add failure view

  render() {
    const {activeCategoryId, activeRatingId, searchInput} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          onChangeCategoryId={this.onChangeCategoryId}
          activeCategoryId={activeCategoryId}
          onChangeRatingId={this.onChangeRatingId}
          activeRatingId={activeRatingId}
          onChangeSearchValue={this.onChangeSearchValue}
          onClickingClearFilterBtn={this.onClickingClearFilterBtn}
          searchInput={searchInput}
        />

        {this.renderAllProductSection()}
      </div>
    )
  }
}

export default AllProductsSection
