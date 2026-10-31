import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Update the image state
      setImage(file)

      // Generate preview URL from the file
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className='flex justify-center mb-6'>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div className='w-24 h-24 flex items-center justify-center bg-clay-surface shadow-clay rounded-full relative'>
          <LuUser className='text-4xl text-primary' />

          <button
            type='button'
            className='w-9 h-9 flex items-center justify-center bg-primary text-white rounded-full shadow-clay-primary absolute -bottom-1 -right-1 cursor-pointer hover:shadow-clay-sm active:shadow-clay-inset transition-shadow duration-150'
            onClick={onChooseFile}
          >
            <LuUpload size={16} />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img
            src={previewUrl}
            alt='profile photo'
            className='w-24 h-24 rounded-full object-cover shadow-clay'
          />
          <button
            type='button'
            className='w-9 h-9 flex items-center justify-center bg-red-400 text-white rounded-full shadow-clay-primary absolute -bottom-1 -right-1 cursor-pointer hover:shadow-clay-sm active:shadow-clay-inset transition-shadow duration-150'
            onClick={handleRemoveImage}
          >
            <LuTrash size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector