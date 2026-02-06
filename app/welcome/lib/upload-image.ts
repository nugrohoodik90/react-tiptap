const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)

  const res = await fetch(
    'https://api-sw.a-enu.my.id/upload/single',
    {
      method: 'POST',
      body: formData,
    }
  )

  const data = await res.json()
  return 'https://api-sw.a-enu.my.id/public/' + data.filename
}


export { uploadImage }