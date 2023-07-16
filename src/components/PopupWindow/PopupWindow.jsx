import React, { useEffect } from 'react'
import s from './PopupWindow.module.css'
import { IoClose } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { add_product } from '../../store/reducers/productListSlice'
import { get_categories } from '../../store/reducers/categoriesSlice'
import { get_subcategories } from '../../store/reducers/subcategoriesSlice'

export default function PopupWindow({ menuActive, setMenuActive, productList }) {
  const categories = useSelector(state => state.categories)
  const subcategories = useSelector(state => state.subcategories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_categories(productList))
    dispatch(get_subcategories(productList))
  }, [dispatch, productList])


  let {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onSubmit' })

  const onSubmit = (data) => {
    setMenuActive(false);
    document.body.style.overflow = '';

    const newProduct = {
      id: Date.now(),
      category: data.new_category !== '' ? data.new_category : data.category,
      subcategory: data.new_subcategory !== '' ? data.new_subcategory : data.subcategory,
      title: data.title,
      description: data.description,
      price: data.price,
      discount: data.discount !== '' ? data.discount : null,
      showKeywords: true,
      showByCategory: true,
      image: 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
    }
    dispatch(add_product(newProduct))
    reset()
  }

  const categorySelect = register('category', {})

  const subcategorySelect = register('subcategory', {})

  const addCategoryInput = register('new_category', {})

  const addSubcategoryInput = register('new_subcategory', {})

  const titleInput = register('title', {
    required: 'Imie jest wymagane',
    maxLength: {
      value: 30,
      message: 'Przekroczona długość nazwy (maks. 30 znaków)'
    }
  })

  const descriptionInput = register('description', {
    required: 'Opis jest wymagane',
    maxLength: {
      value: 200,
      message: 'Przekroczona długość nazwy (maks. 200 znaków)'
    }
  })

  const priceInput = register('price', {
    required: 'Pole nie jest wypełnione',
  })

  const discountInput = register('discount', {})

  return (
    <div onClick={() => setMenuActive(false)} className={`${s.modal} ${menuActive && s.active}`}>
      <div onClick={(e) => e.stopPropagation()} className={`${s.modal_content} ${menuActive && s.active}`}>
        <div className={s.message_box}>
          <IoClose className={s.close_btn} onClick={() => {
            setMenuActive(false);
            document.body.style.overflow = '';
          }} />
          <form onSubmit={handleSubmit(onSubmit)} className={s.form_inner}>
            <div className={s.form_section}>
              <label>
                Category:
                <select
                  placeholder='Category'
                  {...categorySelect}
                >
                  {categories.map((elem, index) => <option value={elem} key={index}>{elem}</option>)}
                </select>
              </label>
            </div>

            <div className={s.form_section}>
              <label>
                Add Category:
                <input
                  placeholder='Nazwa '
                  {...addCategoryInput}
                />
              </label>
            </div>

            <div className={s.form_section}>
              <label>
                Subcategory:
                <select
                  placeholder='Subcategory'
                  {...subcategorySelect}
                >
                  {subcategories.map((elem, index) => <option value={elem} key={index}>{elem}</option>)}
                </select>
              </label>
            </div>

            <div className={s.form_section}>
              <label>
                Add Subcategory:
                <input
                  placeholder='Nazwa '
                  {...addSubcategoryInput}
                />
              </label>
            </div>

            <div className={s.form_section}>
              <label>
                Title:
                <input
                  placeholder='Title'
                  {...titleInput}
                />
              </label>
            </div>
            {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

            <div className={s.form_section}>
              <label>
                Description:
                <textarea
                  placeholder='Description'
                  {...descriptionInput}
                />
              </label>
            </div>
            {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}

            <div className={s.form_section}>
              <label>
                Price:
                <input
                  placeholder='Price'
                  {...priceInput} type='number' min={0} />
              </label>
            </div>
            {errors.price && <p style={{ color: 'red' }}>{errors.price.message}</p>}

            <div className={s.form_section}>
              <label>
                Discount:
                <input
                  placeholder='Discount'
                  {...discountInput} type='number' min={0} />
              </label>
            </div>

            <div className={s.form_section}>
              <button type='submit' className={s.add_btn}>Dodaj</button>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}
