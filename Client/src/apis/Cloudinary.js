export const upload = async (images) => {
    let imgArr = []
    for(const i of images){
        const formData = new FormData()
        formData.append("file", i)
        formData.append("cloud_name", "minh2027")
        formData.append("upload_preset", "xf9mllsp")

        const res = await fetch("https://api.cloudinary.com/v1_1/minh2027/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr
}

export const checkImage = (image) => {
    let err
    if(!image) return err='Image not found!'
    if(image.size > 1024*1024*15) return err='Image is larger than 15mb'
    if(image.type !== 'image/png' && image.type !== 'image/jpeg' && image.type !== 'image/jpg') return err='Format is not supported'
    return err
}