/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import LabeledInput from "./LabeledInput";
import TextArea from './TextArea';
import LabeledSelect from './LabeledSelect';
import useForm from '../hooks/useForm';
import Swal from "sweetalert2";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost, getPostById, updatePost } from '../actions/post';
import { useEffect } from 'react';

function PostForm({ id, categories }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function onSubmit(formData) {
    const message = validatePayload(formData)

    if (message) {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
      return
    }

    let result; 
    if (id) {
      const { error: message } = await dispatch(updatePost(id, formData))
      result = message
    } else {
      const { error: message } = await dispatch(createPost(formData))
      result = message
    }
    if (result) {
      Swal.fire({
        title: "Error",
        text: result,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: `New post ${ id ? 'updated' : 'added' } successfully`,
        icon: "success",
      });
      navigate('/')
    }

    function validatePayload({
      title, content, imgUrl, categoryId
    }) {
      if (!title) {
        return 'Title is required'
      }
      if (!categoryId) {
        return 'categoryId is required'
      }
      if (!content) {
        return 'Content is required'
      }
      if (!imgUrl) {
        return 'ImgUrl is required'
      }
      return null
    }
  }
  const { formData, handleInputChange, handleSubmit, addItem, setFormData } = useForm({
    title: '',
    content: '',
    imgUrl: '',
    categoryId: 0,
    tags: []
  }, onSubmit)

  useEffect(() => {
    if (id) {
      (async() => {
        const { post, error} = await dispatch(getPostById(id))
        if (error) {
          Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
          })
        } else if(post) {
          setFormData({
            title: post.title,
            content: post.content,
            imgUrl: post.imgUrl,
            categoryId: post.categoryId,
            tags: post.tags.map(tag => tag.name)
          })
        }
      })()
    }
  }, [])


  const addTagInput = () => {
    addItem('tags')
  }
  
  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <LabeledInput id="title" label="Title" name="title" inputType="text" value={formData.title} setValue={handleInputChange} />
      <LabeledSelect id="categoryId" label="Category" name="categoryId" data={categories} value={formData.categoryId} setValue={handleInputChange} />
      <TextArea id="content" label="Content" name="content" value={formData.content} setValue={handleInputChange} />
      <LabeledInput id="imgUrl" label="Image Url" name="imgUrl" inputType="url" value={formData.imgUrl} setValue={handleInputChange} />
      <LabeledInput id="tags" label="Tags" name="tags" inputType="text" value={formData.tags} setValue={handleInputChange} />
      <button className='btn btn-primary w-fit' disabled={(formData.tags.at(-1)?.length < 1)} onClick={addTagInput}>Add Tag</button>
      
      <div className="flex justify-end gap-3">
        <button className="btn btn-primary my-5 w-fit">
          <NavLink to="/">Cancel</NavLink>
        </button>
        <button className="btn btn-primary my-5 w-fit" type='submit'>{id ? 'Save' : 'Submit'}</button>
      </div>
    </form >
  )
}

PostForm.propTypes = {
  id: PropTypes.number,
  categories: PropTypes.array.isRequired,
}

export default PostForm